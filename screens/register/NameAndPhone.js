import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import ButtonCustom from '../../components/button'
import { RadioButton } from 'react-native-paper';
const NameAndPhone = ({ navigation }) => {
  var [phone, setPhone] = React.useState('')
  var [name, setName] = React.useState('')
  const [checked, setChecked] = React.useState('Nam');

  return (
    <View style={{ backgroundColor: 'lightblue', width: '100%', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <View style={{ alignItems: 'center', justifyContent: 'center', width: '80%', flex: 1 }}>
        <Text style={{ fontSize: 30, fontWeight: 700 }}>ĐĂNG KÝ TÀI KHOẢN</Text>
      </View>
      <View style={{ flex: 4, width: '90%' }}>
        <View style={{ justifyContent: 'space-between', paddingVertical: 20 }}>
          <Text style={styles.text}>Tên:</Text>
          <TextInput style={{
            padding: 10,
            height: 40,
            fontSize: 20,
            borderColor: 'black',
            borderWidth: 1,
            borderRadius: 5
          }}
            value={name}
            onChangeText={setName}
            placeholder={'Nhập tên tài khoản'}
            placeholderTextColor={'gray'}
          />
          <Text style={styles.text}>Giới tính:</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <RadioButton
              value="Nam"
              status={checked === 'Nam' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Nam')}
            />
            <Text style={styles.text}>Nam</Text>
            <RadioButton
              value="Nữ"
              status={checked === 'Nữ' ? 'checked' : 'unchecked'}
              onPress={() => setChecked('Nữ')}
            />
            <Text style={styles.text}>Nữ</Text>
          </View>
          <Text style={styles.text}>Số điện thoại:</Text>
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
            // onSignup()
            navigation.navigate('AuthenticateOTP', { name: name, gender: checked, phone: phone })
          }
        } />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5
  }
})

export default NameAndPhone