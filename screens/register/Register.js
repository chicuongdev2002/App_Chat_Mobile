import { createStackNavigator } from "@react-navigation/stack"
import NameAndPhone from "./NameAndPhone"
import AuthenticateOTP from "./AuthenticateOTP"
import CreatePassword from "./CreatePassword"

const Stack = createStackNavigator()
const Register = () => {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
    >
      <Stack.Screen name="NameAndPhone" component={NameAndPhone} />
      <Stack.Screen name="AuthenticateOTP" component={AuthenticateOTP} />
      <Stack.Screen name="CreatePassword" component={CreatePassword} />
    </Stack.Navigator>
  )
}

export default Register