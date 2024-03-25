import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import User from '../user/User'
import Contact from '../Contact'
import ListChat from '../listChat/ListChat'
import UserProfile from '../user/UserProfile'
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
const Tab = createMaterialBottomTabNavigator()

const TabHome = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Tin nhắn" 
        component={ListChat} 
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="chatbubble-ellipses-outline" size={24} color="#0A68FE" />
          )
        }}
      />
      <Tab.Screen 
        name="Danh bạ" 
        component={Contact} 
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="contacts" size={24} color="#0A68FE" />
          )
        }}
      />
      <Tab.Screen 
        name="Cá nhân" 
        component={UserProfile} 
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="user" size={24} color="#0A68FE" />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default TabHome
