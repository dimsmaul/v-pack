
# VDialog

Modal dialog component with animated overlay and optional actions.

## Basic Usage

```tsx
import { VDialog } from 'v-pack';
import { useState } from 'react';
import { Text } from 'react-native';

function DialogExample() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <VButton onPress={() => setVisible(true)}>Open Dialog</VButton>

      <VDialog
        visible={visible}
        onClose={() => setVisible(false)}
        title="Confirm Action"
      >
        <Text>Are you sure you want to proceed?</Text>
      </VDialog>
    </>
  );
}
```

### With Bottom Actions
```tsx
<VDialog
  visible={visible}
  onClose={() => setVisible(false)}
  title="Delete Item"
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
        type="danger"
        style={{ flex: 1 }}
        onPress={() => {
          deleteItem();
          setVisible(false);
        }}
      >
        Delete
      </VButton>
    </View>
  }
>
  <Text>This action cannot be undone.</Text>
</VDialog>
```

### Non Scrollable
```tsx
<VDialog
  visible={visible}
  onClose={() => setVisible(false)}
  scrollable={false}
>
  <Text>Short content</Text>
</VDialog>
```

### Without Close Button
```tsx
<VDialog
  visible={visible}
  onClose={() => setVisible(false)}
  showCloseButton={false}
>
  <Text>Content</Text>
</VDialog>
```

## Props
| Prop            | Type       | Default  | Description         |
| --------------- | ---------- | -------- | ------------------- |
| visible         | boolean    | required | Show/hide dialog    |
| onClose         | () => void | required | Close handler       |
| title           | ReactNode  | -        | Dialog title        |
| children        | ReactNode  | required | Dialog content      |
| showCloseButton | boolean    | true     | Show close icon     |
| maxWidth        | number     | 400      | Max width in pixels |
| bottomAction    | ReactNode  | -        | Action buttons area |
| scrollable      | boolean    | true     | Scrollable content  |