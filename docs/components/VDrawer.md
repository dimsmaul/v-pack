
# VDrawer
Bottom drawer/sheet component with smooth animations and drag-to-close.

## Basic Usage
```tsx
import { VDrawer } from 'v-pack';
import { useState } from 'react';
import { Text } from 'react-native';

function DrawerExample() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <VButton onPress={() => setVisible(true)}>Open Drawer</VButton>

      <VDrawer
        visible={visible}
        onClose={() => setVisible(false)}
        title="Options"
      >
        <Text>Drawer content here</Text>
      </VDrawer>
    </>
  );
}
```
### With Bottom Actions
```tsx
<VDrawer
  visible={visible}
  onClose={() => setVisible(false)}
  title="Select Item"
  bottomAction={
    <View style={{ flexDirection: 'row', gap: 8 }}>
      <VButton
        variant="outline"
        style={{ flex: 1 }}
        onPress={() => setVisible(false)}
      >
        Cancel
      </VButton>
      <VButton
        style={{ flex: 1 }}
        onPress={() => {
          selectItem();
          setVisible(false);
        }}
      >
        Select
      </VButton>
    </View>
  }
>
  <Text>Choose an option</Text>
</VDrawer>
```
### Custom Height
```tsx
<VDrawer
  visible={visible}
  onClose={() => setVisible(false)}
  height={500}
>
  <Text>Content</Text>
</VDrawer>
```
### Disable Drag to Close
```tsx
<VDrawer
  visible={visible}
  onClose={() => setVisible(false)}
  enablePanDownToClose={false}
>
  <Text>Drag disabled</Text>
</VDrawer>
```

## Props
| Prop                 | Type            | Default  | Description         |
| -------------------- | --------------- | -------- | ------------------- |
| visible              | boolean         | required | Show/hide drawer    |
| onClose              | () => void      | required | Close handler       |
| title                | ReactNode       | -        | Drawer title        |
| children             | ReactNode       | required | Drawer content      |
| showCloseButton      | boolean         | true     | Show close icon     |
| height               | number \| 'auto' | 'auto'   | Drawer height       |
| enablePanDownToClose | boolean         | true     | Drag down to close  |
| bottomAction         | ReactNode       | -        | Action buttons area |
| scrollable           | boolean         | true     | Scrollable content  |