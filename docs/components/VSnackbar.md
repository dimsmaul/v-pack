# VSnackbar
Toast notification component with customizable types and actions.

## Basic Usage
```tsx
import { useSnackbar } from 'v-pack';

function MyComponent() {
  const { show } = useSnackbar();

  return (
    <VButton
      onPress={() =>
        show({ message: 'Hello! This is a snackbar' })
      }
    >
      Show Snackbar
    </VButton>
  );
}
```
### With Type
```tsx
const { show } = useSnackbar();

show({
  message: 'Operation successful',
  type: 'success',
});

show({
  message: 'An error occurred',
  type: 'danger',
});

show({
  message: 'Warning',
  type: 'warning',
});

show({
  message: 'Information',
  type: 'info',
});
```
### With Action Button
```tsx
show({
  message: 'Item deleted',
  type: 'info',
  action: {
    label: 'Undo',
    onPress: () => {
      // Undo action
    },
  },
});

```
### Custom Duration
```tsx
show({
  message: 'This will stay longer',
  duration: 5000, // 5 seconds
});

show({
  message: 'This will stay forever',
  duration: 0, // No auto-hide
});
```
### With Custom Icon
```tsx
import { AlertCircle } from 'lucide-react-native';

show({
  message: 'Custom icon',
  type: 'danger',
  icon: AlertCircle,
});
```
### Provider Setup
Wrap your app with VSnackbarProvider:

```tsx
import { VPackProvider, VSnackbarProvider } from 'v-pack';
import theme from './tailwind.config.js';

<VPackProvider theme={theme}>
  <VSnackbarProvider>
    <App />
  </VSnackbarProvider>
</VPackProvider>
```
### Props
show(options)
| Option          | Type                                                                | Default     | Description                                 |
| --------------- | ------------------------------------------------------------------- | ----------- | ------------------------------------------- |
| message         | string                                                              | required    | Snackbar message                            |
| type            | 'success' \| 'danger' \| 'warning' \| 'info' \| 'primary' \| 'secondary' | 'secondary' | Snackbar type                               |
| duration        | number                                                              | 3000        | Auto-hide duration (ms), 0 for no auto-hide |
| action          | {label: string, onPress: () => void}                                | -           | Action button                               |
| icon            | LucideIcon                                                          | -           | Custom icon                                 |
| showCloseButton | boolean                                                             | true        | Show close icon                             |