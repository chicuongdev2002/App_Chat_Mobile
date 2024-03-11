import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
// import HomeChat from '../listChat/HomeChat'
import User from '../user/User'
import Listchat from '../listChat/ListChat'

const Tab = createMaterialBottomTabNavigator()
const TabHome = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Listchat" component={Listchat} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  )
}

export default TabHome