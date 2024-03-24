import store from './Redux/store'
import { Provider } from 'react-redux';
import Auth from './screens/auth/auth';
export default function App() {
  return (
    <Provider store={store}>
        <Auth />
    </Provider>
  );
}