# Theming
V-Pack uses Tailwind CSS via ```twrnc``` for styling. Customize your design system through ```tailwind.config.js```.

## Generated Config
```bash
npx v-pack init
```

Creates ```tailwind.config.js``` with default colors, fonts, and spacing.

## Customize Colors
Edit ```tailwind.config.js```:
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#0ea5e9',    // Main brand color
          600: '#0284c7',
        },
        success: {
          500: '#22c55e',
        },
        danger: {
          500: '#ef4444',
        },
        warning: {
          500: '#f59e0b',
        },
        info: {
          500: '#3b82f6',
        },
      },
    },
  },
};
```

## Use in VPackProvider
```tsx
import { VPackProvider } from 'v-pack';
import theme from './tailwind.config.js';

<VPackProvider theme={theme}>
  <App />
</VPackProvider>
```

## Access Theme in Components
```tsx
import { useTheme } from 'v-pack';
import { View, Text } from 'react-native';

function MyComponent() {
  const { tw } = useTheme();

  return (
    <View style={tw`bg-primary-500 p-4 rounded-lg`}>
      <Text style={tw`text-white font-bold`}>
        Themed Text
      </Text>
    </View>
  );
}
```

## Get Color Values
```tsx
const { tw } = useTheme();

const primaryColor = tw.color('primary-500');  // '#0ea5e9'
```

## Font Family
```js
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'System'],
        heading: ['Poppins', 'System'],
        mono: ['Courier', 'System'],
      },
    },
  },
};
```
in components
```tsx
<Text style={tw`font-sans`}>Regular text</Text>
<Text style={tw`font-heading font-bold text-xl`}>Heading</Text>
<Text style={tw`font-mono`}>Code</Text>
```

## Spacing
```js
module.exports = {
  theme: {
    extend: {
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
    },
  },
};
```

## Border Radius
```js
module.exports = {
  theme: {
    extend: {
      borderRadius: {
        '3xl': '24px',
      },
    },
  },
};
```

