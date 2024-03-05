import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import ListChat from '../listChat/ListChat'
import User from '../user/User'
import Contact from '../Contact' 
const Tab = createMaterialBottomTabNavigator()
const TabHome = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ListChat" component={ListChat} />
      <Tab.Screen name="Danh bạ" component={Contact} />
    </Tab.Navigator>
  )
}

export default TabHome