import tw, { useDeviceContext } from 'twrnc';
import { VPackProvider } from 'v-pack';
// import { useNavigation } from '@react-navigation/native';
import Documentation from './pages/Documentation';
import type { VPackNavigation } from 'v-pack';
// const theme = require('./../tailwind.config.js');

// const Stack = createStackNavigator();

export default function App() {
  useDeviceContext(tw);
  return (
    <>
      <VPackNavigation />
    </>
  );
}

const VPackNavigation = () => {
  return (
    <VPackProvider>
      <Documentation />
      {/* <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Documentation" component={Documentation} />
      </Stack.Navigator> */}
    </VPackProvider>
  );
};
