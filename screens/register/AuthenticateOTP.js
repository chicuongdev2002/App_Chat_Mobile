import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { OtpInput } from "react-native-otp-entry";
import ButtonCustom from '../../components/button'

const AuthenticateOTP = ({navigation, route}) => {
    return (
        <View style={{ flex: 1, backgroundColor: 'lightblue', width: '100%', paddingHorizontal: 10, justifyContent: 'center' }}>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={styles.text}>Mã OTP đã được gửi đến số điện thoại: {route.params.phone}</Text>
            </View>
            <View style={{ flex: 5 }}>
                <View style={{ width: '100%' }}>
                    <Text style={styles.text}>Nhập mã OTP trên điện thoại:</Text>
                    <OtpInput numberOfDigits={6}
                    theme={{
                        containerStyle:{
                            marginVertical: 10
                        },
                        pinCodeContainerStyle:{
                            borderWidth: 1,
                            borderColor: 'black',
                        }
                    }}
                    onTextChange={(text) => console.log(text)} />
                </View>
                <ButtonCustom title={'Xác thực'} backgroundColor={'cyan'} onPress={
                    () => {
                       navigation.navigate('CreatePassword', route.params)
                    }
                } />
                <View style={{flexDirection: 'row', marginTop:20}}>
                    <Text style={styles.text}>Bạn không nhận được mã? </Text>
                    <TouchableOpacity style={{
                        fontSize: 20, color: 'blue', justifyContent: 'flex-end', alignItems: 'center'
                    }}><Text>Gửi lại</Text></TouchableOpacity>
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