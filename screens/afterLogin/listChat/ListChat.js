import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons'; 
import store from '../../../Redux/Redux';

const ListChat = ({ navigation, route }) => {
  const [phoneNumber, setPhoneNumber] = useState(store.getState().phoneNumber);
  const [password, setPassword] = useState(store.getState().password);

  return (
    <View style={{ marginTop: 40, marginLeft: 20,flexDirection:"row"}}>
      <View>
      <TouchableOpacity onPress={() => navigation.navigate("Chat", route.params)}>
        <Text>Next</Text>
      </TouchableOpacity>
      </View>
   <View style={{marginLeft:"70%"}}>
   <TouchableOpacity onPress={() => navigation.navigate("ScanQR", route.params)}>
        <FontAwesome name="qrcode" size={30} color="black" />
      </TouchableOpacity>
   </View>
    </View>
  );
}

export default ListChat;
