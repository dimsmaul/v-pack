# VPackProvider

`VPackProvider` is a required wrapper that provides theme context and utilities to all V-Pack components.

## Basic Usage

```tsx
import { VPackProvider } from 'v-pack';
const theme = require('./../tailwind.config.js');

export default function App() {
  return (
    <VPackProvider theme={theme}>
      <YourApp />
    </VPackProvider>
  );
}
```

### With Expo Router

```tsx
import { Stack } from 'expo-router';
import { VPackProvider } from 'v-pack';
const theme = require('./../tailwind.config.js');

export default function RootLayout() {
  return (
    <VPackProvider theme={theme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
      </Stack>
    </VPackProvider>
  );
}
```

### With React Navigation

```tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { VPackProvider } from 'v-pack';

const theme = require('./../tailwind.config.js');
const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <VPackProvider theme={theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </VPackProvider>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
```

| Prop       | Type      | Required | Description                                           |
| ---------- | --------- | -------- | ----------------------------------------------------- |
| theme      | object    | No       | Tailwind config from tailwind.config.js               |
| navigation | any       | No       | Navigation instance (expo-router or react-navigation) |
| children   | ReactNode | Yes      | Your app components                                   |

Uses default Tailwind colors. Not recommended for production.