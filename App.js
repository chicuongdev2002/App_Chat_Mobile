import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/login/Login';
import Register from './screens/register/Register';
import ForgotPassword from './screens/forgotPassword/ForgotPassword';
import TabHome from './screens/afterLogin/tabHome/TabHome';
import HomeChat from './screens/afterLogin/listChat/HomeChat';
import CreatePassword from './screens/register/CreatePassword';
const Stack = createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
    >
      {/* <Stack.Screen name="Login" component={Login}      />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */}
      <Stack.Screen name="Home" component={HomeChat} />
      <Stack.Screen name="CreatePassword" component={CreatePassword} />
    </Stack.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
