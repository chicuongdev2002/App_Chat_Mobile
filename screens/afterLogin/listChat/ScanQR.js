import React, { useEffect, useState } from 'react';
import { Button, Dimensions, StyleSheet, TouchableOpacity, Text, View, Platform } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';
import * as LocalAuthentication from 'expo-local-authentication';

const finderWidth = 280;
const finderHeight = 230;
const { width, height } = Dimensions.get('window');
const viewMinX = (width - finderWidth) / 2;
const viewMinY = (height - finderHeight) / 2;

export default function ScanQR({ navigation }) {
  const [hasPermission, setHasPermission] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [authenticationResult, setAuthenticationResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(5);
  const [canLogin, setCanLogin] = useState(false); // Thêm biến state mới

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0 && scanned) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, scanned]);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    // Cập nhật trạng thái của biến state dựa trên giá trị của timeLeft
    if (timeLeft === 0) {
      setCanLogin(true);
    } else {
      setCanLogin(false);
    }
  }, [timeLeft]);

  const handleBarCodeScanned = async ({ type, data, bounds }) => {
    if (!scanned) {
      setShowConfirmation(true);
      const { origin } = bounds;
      const { x, y } = origin;

      if (
        x >= viewMinX &&
        y >= viewMinY &&
        x <= viewMinX + finderWidth / 2 &&
        y <= viewMinY + finderHeight / 2
      ) {
        setScanned(true);

        let authResult;
        if (Platform.OS === 'ios') {
          authResult = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Xác thực bằng Face ID hoặc Vân tay để đăng nhập',
          });
        }
        if (Platform.OS === 'android') {
          authResult = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Xác thực bằng vân tay hoặc password để đăng nhập',
          });
        }

        setAuthenticationResult(authResult.success);
        console.log("Type QR",{type});
        console.log("Data",{data});
      }
    }
  };

  const handleScanAgain = () => {
    setScanned(false);
    setShowConfirmation(false);
    setTimeLeft(5);
    setCanLogin(false); // Reset trạng thái của nút đăng nhập
  };

  if (hasPermission === null) {
    return <Text>Yêu cầu quyền camera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Không có quyền</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {!showConfirmation && (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          style={[StyleSheet.absoluteFillObject, styles.container]}
        >
          <View style={{ flex: 1, backgroundColor: 'transparent', flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ flex: 1, alignItems: 'flex-end' }}
              onPress={() => navigation.goBack()}
            >
              <Text style={{ fontSize: 18, margin: 5, color: 'white' }}>Back</Text>
            </TouchableOpacity>
          </View>
          <BarcodeMask edgeColor="#62B1F6" showAnimatedLine />
        </BarCodeScanner>
      )}

      {showConfirmation && (
        <View style={styles.container}>
          <Text style={styles.maintext}>Xác nhận đăng nhập</Text>
          {scanned && timeLeft > 0 && <Text style={styles.timerText}>Thời gian còn lại: {timeLeft} giây</Text>}
          {authenticationResult ? (
            <Button title={'Đăng nhập'} onPress={() => console.log('Đăng nhập thành công')} disabled={!canLogin} />
          ) : (
            <Text style={{ fontSize: 16, marginBottom: 20 }}>Xác thực không thành công.</Text>
          )}
          <Button title={'Quay lại'} onPress={() => (navigation.goBack(), handleScanAgain())} />
        </View>
      )}
      {scanned && timeLeft === 0 && <Button title="Quét lại" onPress={handleScanAgain} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  maintext: {
    fontSize: 30
  },
  timerText: {
    fontSize: 20,
    marginTop: 10
  }
});
