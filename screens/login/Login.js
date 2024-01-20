import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const Login = ({navigation}) => {
  return (
    <View>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
            <Text>Login</Text>
        </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text>Register</Text>
      </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ForgotPassword')}>
            <Text>Forgot Password</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button:{
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightblue'
    }
})

export default Login