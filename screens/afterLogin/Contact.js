import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import ContactAction from './ContactAction';
import User from './user/User';
export default function ContactScreen({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ContactAction
        name="search"
        type="ionicon"
        title="Tìm kiếm bạn bè"
        backgroundColor="#006AF5"
      />
      <ContactAction
        name="group"
        type="material"
        title="Lời mời kết bạn"
        backgroundColor="#006AF5"
        handlePress={() => navigation.navigate('Lời mời kết bạn')}
      />
      <ContactAction
        name="phone-square"
        type="font-awesome"
        title="Bạn từ danh bạ máy"
        backgroundColor="#006AF5"
        handlePress={() => navigation.navigate('User')}
      />
      <View style={styles.empty}>
        <Icon name="warning" type="antdesign" />
        <Text style={styles.text}>Chưa có bạn bè</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 15,
    marginVertical: 8,
  },
  empty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  text: {
    marginTop: 10,
  },
});
