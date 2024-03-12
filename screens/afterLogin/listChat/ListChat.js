import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import store from '../../../Redux/Redux';
const ListChat = ({ navigation, route }) => {
  const [phoneNumber, setPhoneNumber] = useState(store.getState().phoneNumber);
  const [password, setPassword] = useState(store.getState().password);
  return (
    <View>
      <Text>ListChat</Text>
      {/* <Text>{phoneNumber}</Text>
      <Text>{password}</Text> */}
      <TouchableOpacity
        onPress={() => navigation.navigate("Chat")}
      >
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ListChat