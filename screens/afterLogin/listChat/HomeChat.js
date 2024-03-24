import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ListChat from './ListChat'
import Chat from './Chat'
import TabHome from '../tabHome/TabHome'
import OptionChat from './OptionChat'
import ScanQR from './ScanQR'
const Stack = createStackNavigator()
const HomChat = ({navigation}) => {
  return (
    <Stack.Navigator>
        {/* <Stack.Screen name="TabHome" component={TabHome}
        options={{
          headerShown: false
        }}
        ></Stack.Screen>
        <Stack.Screen name="ListChat" initialParams={navigation} component={ListChat} /> */}
        <Stack.Screen name="Chat" component={Chat} 
        options={{
          headerStyle: {
            backgroundColor: 'lightblue',
          },
          headerTitleStyle:{
            fontSize: 20
          },
        }}/>
        <Stack.Screen name="OptionChat" component={OptionChat} />
        <Stack.Screen name="ScanQR" component={ScanQR} />
    </Stack.Navigator>
  )
}

export default HomChat