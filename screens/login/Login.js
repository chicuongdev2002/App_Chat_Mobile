import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Login = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    navigation.navigate('Home');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };
  
  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <SafeAreaView 
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}>
      <ScrollView  
        style={{
          flex: 1,
          backgroundColor: "#ffffff",
          paddingBottom: 17,
        }}>
        <View 
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#1fadea",
            paddingVertical: 17,
            paddingHorizontal: 14,
          }}>
          <Text 
            style={{
              color: "#fdf8f8",
              fontSize: 20,
              flex: 1,
            }}>
            {"Đăng nhập"}
          </Text>
        </View>
        <View 
          style={{
            backgroundColor: "#d9d9d9",
            paddingVertical: 7,
            paddingHorizontal: 14,
            marginBottom: 32,
          }}>
          <Text 
            style={{
              color: "#000000",
              fontSize: 20,
            }}>
            {"Vui lòng nhập số điện thoại và mật khẩu đăng nhập"}
          </Text>
        </View>
        <TextInput 
          style={{
            height: 40,
            // borderColor: "#06c3ff",
            // borderBottomWidth: 1,
            marginBottom: 16,
            marginHorizontal: 15,
            color: "#635b5b",
            fontSize: 20,
          }}
          placeholder="Số điện thoại"
          placeholderTextColor="#635b5b"
          onChangeText={(text) => setPhoneNumber(text)}
          value={phoneNumber}
          keyboardType="numeric"
        />
        <View 
          style={{
            height: 1,
            backgroundColor: "#06c3ff",
            marginBottom: 16,
            marginHorizontal: 15,
          }}>
        </View>
        <View 
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 22,
            marginHorizontal: 15,
          }}>
          <TextInput 
            style={{
              flex: 1,
              height: 40,
              color: "#635b5b",
              fontSize: 20,
            }}
            placeholder="Mật khẩu"
            placeholderTextColor="#635b5b"
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            onPress={handleTogglePasswordVisibility}>
            <Text 
              style={{
                color: "#635b5b",
                fontSize: 12,
              }}>
              {showPassword ? "ẨN" : "HIỆN"}
            </Text>
          </TouchableOpacity>
        </View>
        <View 
          style={{
            height: 1,
            backgroundColor: "#000000",
            marginBottom: 20,
            marginHorizontal: 15,
          }}>
        </View>
        <Text 
          style={{
            color: "#2752eb",
            fontSize: 20,
            marginBottom: 49,
            marginLeft: 15,
            textDecorationLine: "underline",
            textDecorationColor: "#2752eb",
          }}
          onPress={handleForgotPassword}>
          {"Lấy lại mật khẩu"}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.buttonLogin}
            onPress={handleLogin}>
            <Text 
              style={styles.buttonTextLogin}>
              {"Đăng nhập"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.buttonRegis}
            onPress={handleRegister}>
            <Text 
              style={styles.buttonTextRegis}>
              {"Đăng kí"}
            </Text>
          </TouchableOpacity>
        </View>
        <Text 
          style={{
            color: "#635b5b",
            fontSize: 12,
            marginLeft: 126,
            marginBottom:50
          }}>
          {"Các câu hỏi thường gặp"}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  buttonLogin: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#1faeeb",
    borderRadius: 20,
    paddingVertical: 13,
    marginBottom: 20,
    marginRight: 5,
  },
  buttonRegis: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    borderRadius: 20,
    paddingVertical: 13,
    marginBottom: 20,
    marginRight: 5,
  },
  buttonTextLogin: {
    color: "#ffffff",
    fontSize: 20,
  },
  buttonTextRegis: {
    color: "#000000",
    fontSize: 20,
  },
});

export default Login;
