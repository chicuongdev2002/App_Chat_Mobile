import { View, Text, TouchableOpacity ,Image} from 'react-native';
import React, { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons'; 
// import store from '../../../Redux/Redux';
import { useSelector } from 'react-redux';

const ListChat = ({ navigation, route }) => {
  const name = useSelector((state) => state.account.userName);
  const avt = useSelector((state) => state.account.avt);
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
