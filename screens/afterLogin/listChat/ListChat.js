import { View, Text } from 'react-native'
import React ,{useState} from 'react'
import store from '../../../Redux/Redux';
const ListChat = () => {
  const [phoneNumber, setPhoneNumber] = useState(store.getState().phoneNumber);
  const [password, setPassword] = useState(store.getState().password);
  return (
    <View>
      <Text>ListChat</Text>
      <Text>{phoneNumber}</Text>
      <Text>{password}</Text>
    </View>
  )
}

export default ListChat