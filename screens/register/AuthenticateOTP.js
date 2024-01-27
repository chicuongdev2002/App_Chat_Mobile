import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import ButtonCustom from '../../components/button'

const AuthenticateOTP = ({navigation, route}) => {
    return (
        <View style={{ flex: 1, backgroundColor: 'lightblue', width: '100%', paddingHorizontal: 10, justifyContent: 'center' }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.text}>Mã OTP đã được gửi đến số điện thoại: {route.params}</Text>
            </View>
            <View style={{ flex: 5 }}>
                <View style={{ width: '100%' }}>
                    <Text style={styles.text}>Nhập mã OTP trên điện thoại:</Text>
                    <OTPInputView style={{ fontSize: 20, marginTop: 10, marginBottom: 20 }} codeInputFieldStyle={{ color: 'black', fontSize: 20, borderColor: 'black', fontWeight: 'bold' }} pinCount={4} />
                </View>
                <ButtonCustom title={'Xác thực'} backgroundColor={'cyan'} onPress={
                    () => {
                       navigation.navigate('CreatePassword')
                    }
                } />
                <View style={{flexDirection: 'row', marginTop:20}}>
                    <Text style={styles.text}>Bạn không nhận được mã? </Text>
                    <TouchableOpacity style={{
                        fontSize: 20, color: 'blue', justifyContent: 'flex-end', alignItems: 'center'
                    }}>Gửi lại</TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 20
    },
})

export default AuthenticateOTP