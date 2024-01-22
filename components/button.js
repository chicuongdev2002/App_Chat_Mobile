import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const ButtonCustom = (props) => {
  return (
    <TouchableOpacity style={{
        backgroundColor: props.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        height: 50,
        }}
        onPress={props.onPress}
        >
        <Text style={{
            fontSize: 20, 
            fontWeight: 'bold',
            color: props.color? props.color:'black',
            }}>{props.title}</Text>
    </TouchableOpacity>
  )
}

export default ButtonCustom