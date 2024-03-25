import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import ButtonCustom from '../../components/button'
import { Entypo } from '@expo/vector-icons';

const CreatePassword = ({ navigation, route }) => {
    var [eye1, setEye1] = React.useState('eye-with-line')
    var [eye2, setEye2] = React.useState('eye-with-line')
    var [secureTextEntry1, setSecureTextEntry1] = React.useState(true)
    var [secureTextEntry2, setSecureTextEntry2] = React.useState(true)
    var [password, setPassword] = React.useState('')
    var [rePassword, setRePassword] = React.useState('')
    var [notification, setNotification] = React.useState('')
    console.log(route.params)

    function checkPassword() {
        if (password != rePassword) {
            setNotification('Mật khẩu không khớp')
            return false
        }
        setNotification('')
        return true;
    }
    function handleRegister() {
        fetch('https://deploybackend-production.up.railway.app/account/registerAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: '5',
                phone: route.params.phone,
                password: password,
                createDate: new Date().toISOString(),
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Response data:', data);
                handleInsertUser(data)
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    function handleInsertUser(data) {
        fetch('https://deploybackend-production.up.railway.app/users/insertUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: data.id,
                userName: route.params.name,
                phone: data.phone,
                gender: route.params.gender,
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Response data:', data);
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    return (
        <View style={{ flex: 1, backgroundColor: 'lightblue', padding: 10 }}>
            <View>
                <Text style={{ fontSize: 30, fontWeight: 700 }}>Nhập mật khẩu để hoàn tất đăng ký</Text>
            </View>
            <View>
                <View style={{ height: 150, justifyContent: 'space-between', marginBottom: 20 }}>
                    <Text style={{ fontSize: 20 }}>Mật khẩu:</Text>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ width: '88%' }}>
                            <TextInput style={{
                                padding: 10,
                                height: 40,
                                fontSize: 20,
                                borderColor: 'black',
                                borderWidth: 1,
                                borderRadius: 5
                            }}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry={secureTextEntry1}
                                placeholder='Nhập mật khẩu'
                                placeholderTextColor={'gray'}
                            />
                        </View>
                        <View style={{ width: '12%', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                if (eye1 == 'eye') {
                                    setEye1('eye-with-line')
                                    setSecureTextEntry1(!secureTextEntry1)
                                }
                                else {
                                    setEye1('eye')
                                    setSecureTextEntry1(!secureTextEntry1)
                                }
                            }}>
                                <Entypo name={eye1} size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{ fontSize: 20 }}>Nhập lại mật khẩu:</Text>
                    <View style={{ flexDirection: 'row', width: '100%' }}>
                        <View style={{ width: '88%' }}>
                            <TextInput style={{
                                padding: 10,
                                height: 40,
                                fontSize: 20,
                                borderColor: 'black',
                                borderWidth: 1,
                                borderRadius: 5
                            }}
                                value={rePassword}
                                onChangeText={setRePassword}
                                secureTextEntry={secureTextEntry2}
                                placeholder='Nhập lại mật khẩu'
                                placeholderTextColor={'gray'}
                            />
                        </View>
                        <View style={{ width: '12%', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => {
                                if (eye2 == 'eye') {
                                    setEye2('eye-with-line')
                                    setSecureTextEntry2(!secureTextEntry2)
                                }
                                else {
                                    setEye2('eye')
                                    setSecureTextEntry2(!secureTextEntry1)
                                }
                            }}>
                                <Entypo name={eye2} size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <ButtonCustom title={'Đăng ký'} backgroundColor={'cyan'} onPress={
                    () => {
                        if (checkPassword() && password != '') {
                            handleRegister()
                            navigation.navigate('Login')
                        }
                    }
                } />
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'red' }}>{notification}</Text>
            </View>
        </View>
    )
}

export default CreatePassword