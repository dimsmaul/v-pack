# VTabs
Tabbed content navigation with pill or underline variants.

## Basic Usage
```tsx
import { VTabs, VTabsList, VTabsTrigger, VTabsContent } from 'v-pack';
import { useState } from 'react';
import { Text } from 'react-native';

function TabsExample() {
  const [activeTab, setActiveTab] = useState('tab1');

  return (
    <VTabs value={activeTab} onValueChange={setActiveTab}>
      <VTabsList>
        <VTabsTrigger value="tab1">Tab 1</VTabsTrigger>
        <VTabsTrigger value="tab2">Tab 2</VTabsTrigger>
        <VTabsTrigger value="tab3">Tab 3</VTabsTrigger>
      </VTabsList>

      <VTabsContent value="tab1">
        <Text>Content for tab 1</Text>
      </VTabsContent>

      <VTabsContent value="tab2">
        <Text>Content for tab 2</Text>
      </VTabsContent>

      <VTabsContent value="tab3">
        <Text>Content for tab 3</Text>
      </VTabsContent>
    </VTabs>
  );
}
```
### Pill Variant
```tsx
<VTabs value={activeTab} onValueChange={setActiveTab} variant="pill">
  <VTabsList>
    <VTabsTrigger value="tab1">Tab 1</VTabsTrigger>
    <VTabsTrigger value="tab2">Tab 2</VTabsTrigger>
  </VTabsList>
  {/* ... content */}
</VTabs>
```

### Underline Variant (Default)
```tsx
<VTabs value={activeTab} onValueChange={setActiveTab} variant="underline">
  <VTabsList>
    <VTabsTrigger value="tab1">Tab 1</VTabsTrigger>
    <VTabsTrigger value="tab2">Tab 2</VTabsTrigger>
  </VTabsList>
  {/* ... content */}
</VTabs>
```
### Disabled Tab
```tsx
<VTabsTrigger value="tab3" disabled>
  Disabled
</VTabsTrigger>
```

## Props
### VTabs

| Prop          | Type                    | Default     | Description        |
| ------------- | ----------------------- | ----------- | ------------------ |
| value         | string                  | required    | Active tab value   |
| onValueChange | (value: string) => void | required    | Tab change handler |
| variant       | 'pill' \| 'underline'   | 'underline' | Tab style variant  |
| children      | ReactNode               | required    | Tab components     |

### VTabsTrigger
| Prop     | Type    | Default  | Description      |
| -------- | ------- | -------- | ---------------- |
| value    | string  | required | Tab unique value |
| children | string  | required | Tab label        |
| disabled | boolean | false    | Disable tab      |