import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import ListChat from '../listChat/ListChat'
import User from '../user/User'

const Tab = createMaterialBottomTabNavigator()
const TabHome = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="ListChat" component={ListChat} />
      <Tab.Screen name="User" component={User} />
    </Tab.Navigator>
  )
}

export default TabHome