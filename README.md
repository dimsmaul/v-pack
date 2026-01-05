# V-Pack

A comprehensive, production-ready UI component library for React Native with Tailwind CSS styling powered by `twrnc`.

## Features

✨ **40+ Components** - Button, Input, Calendar, Select, Drawer, Avatar, and more  
🎨 **Tailwind CSS** - Utility-first styling with `twrnc`  
📱 **React Native** - iOS & Android support  
🔧 **TypeScript** - Full type safety  
🎯 **Customizable** - Easy theme customization  
🚀 **Production Ready** - Battle-tested components  
📦 **Tree Shakeable** - Import only what you need  
♿ **Accessible** - Built with accessibility in mind

## Installation

```bash
npm install v-pack twrnc
```

## Initialize Theme
```bash
npx v-pack init
```

## Setup VPackProvider
### Basic
```tsx
import { VPackProvider } from 'v-pack';
import theme from './tailwind.config.js';

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
import { Stack, useRouter } from 'expo-router';
import { VPackProvider } from 'v-pack';
import theme from '../tailwind.config.js';

export default function RootLayout() {
  const router = useRouter();
  
  return (
    <VPackProvider theme={theme} navigation={router}>
      <Stack>
        <Stack.Screen name="index" />
      </Stack>
    </VPackProvider>
  );
}
```

### With React Navigation
```tsx
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { VPackProvider } from 'v-pack';
import theme from './tailwind.config.js';

function AppNavigator() {
  const navigation = useNavigation();
  
  return (
    <VPackProvider theme={theme} navigation={navigation}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </VPackProvider>
  );
}
```

### Theme Configuration
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#0ea5e9',
          600: '#0284c7',
        },
        // ... more colors
      },
    },
  },
};
```

## Example Usage

### Components
```tsx
import { VButton, VInput } from 'v-pack';
import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  
  return (
    <>
      <VInput 
        label="Name" 
        value={name} 
        onChangeText={setName} 
      />
      <VButton onPress={() => console.log(name)}>
        Submit
      </VButton>
    </>
  );
}
```

### Access Tailwind
```tsx
import { useTheme } from 'v-pack';
import { View, Text } from 'react-native';

function Card() {
  const { tw } = useTheme();
  
  return (
    <View style={tw`bg-white p-4 rounded-lg shadow`}>
      <Text style={tw`text-primary-600 font-bold`}>
        Hello
      </Text>
    </View>
  );
}
```

## Contributing

- [Development workflow](CONTRIBUTING.md#development-workflow)
- [Sending a pull request](CONTRIBUTING.md#sending-a-pull-request)
- [Code of conduct](CODE_OF_CONDUCT.md)

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
