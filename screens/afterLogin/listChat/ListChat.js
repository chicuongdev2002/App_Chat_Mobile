import { View, Text, TouchableOpacity ,Image} from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons'; 
import store from '../../../Redux/Redux';

const ListChat = ({ navigation, route }) => {
  // const [phoneNumber, setPhoneNumber] = useState(store.getState().phoneNumber);
  // const [password, setPassword] = useState(store.getState().password);
  const [name, setName] = useState(store.getState().userName);
  const [avt, setAvt] = useState(store.getState().avt);
  return (
    <View style={{ marginTop: 40, marginLeft: 20,flexDirection:"row"}}>
      <View>
      <TouchableOpacity onPress={() => navigation.navigate("Chat", route.params)}>
        <Text>{name}</Text>
      </TouchableOpacity>
      <Image source={{ uri: avt }} style={{ width: 50, height: 50, borderRadius: 25 }} />
      </View>
   <View style={{marginLeft:"60%"}}>
   <TouchableOpacity onPress={() => navigation.navigate("ScanQR", route.params)}>
        <FontAwesome name="qrcode" size={30} color="black" />
      </TouchableOpacity>
   </View>
    </View>
  );
}

export default ListChat;
