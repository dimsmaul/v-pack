# Installation

## Requirements

- Node.js >= 16
- React Native >= 0.70
- React >= 18

## Init React Native

### Expo

```bash
npx create-expo-app my-app
cd my-app
```

### React Native CLI
```bash
npx react-native init MyApp
cd MyApp
```

Install Package
```bash
npm install v-pack twrnc
```

Initialize V-Pack
```bash
npx v-pack init
```
Creates ```tailwind.config.js``` in your project root.

## Setup Provider

```tsx
// App.tsx
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

## Optional Dependencies
```bash
# For Calendar
npm install dayjs

# For Form
npm install zod react-hook-form @hookform/resolvers
```


 