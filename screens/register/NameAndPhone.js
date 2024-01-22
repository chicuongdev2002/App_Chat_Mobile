import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import ButtonCustom from '../../components/button'
const NameAndPhone = ({navigation}) => {
    var [phone, setPhone] = React.useState('')
    
  return (
    <View style={{ backgroundColor: 'lightblue', width: '100%', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', width: '80%', flex: 1 }}>
        <Text style={{ fontSize: 30, fontWeight: 700 }}>ĐĂNG KÝ TÀI KHOẢN</Text>
      </View>
      <View style={{ flex: 3, width: '90%' }}>
        <View style={{ height: 200, justifyContent: 'space-between', paddingVertical: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Tên:</Text>
          <TextInput style={{
            padding: 10,
            height: 40,
            fontSize: 20,
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 5
        }}
            placeholder={'Nhập tên tài khoản'}
            placeholderTextColor={'gray'}
        />
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Số điện thoại:</Text>
          <TextInput style={{
            padding: 10,
            height: 40,
            fontSize: 20,
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 5
        }}
        value={phone}
        onChangeText={setPhone}
            placeholder='Nhập số điện thoại'
            placeholderTextColor={'gray'}
        />
        </View>
        <ButtonCustom title={'Xác thực OTP'} backgroundColor={'cyan'} onPress={
          () => {
            navigation.navigate('AuthenticateOTP', phone)
          }
        }/>
      </View>
    </View>
  )
}

export default NameAndPhone