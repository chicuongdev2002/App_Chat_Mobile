import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './screens/login/Login';
import Register from './screens/register/Register';
import ForgotPassword from './screens/forgotPassword/ForgotPassword';
import TabHome from './screens/afterLogin/tabHome/TabHome';
import CreatePassword from './screens/register/CreatePassword';
import User  from './screens/afterLogin/user/User';
const Stack = createStackNavigator()
export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator
    screenOptions={{
      headerShown: true
    }}
    >
      <Stack.Screen name="Login" component={Login}      />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Home" component={TabHome} />
      <Stack.Screen name="CreatePassword" component={CreatePassword} />
      <Stack.Screen name="User" component={User} />
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
