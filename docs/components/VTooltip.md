# VTooltip
Display informative tooltips on press with smart positioning and auto-adjustment to prevent content from being cut off at screen edges.

## Basic Usage
```tsx
import { VTooltip } from 'v-pack';
import { Text } from 'react-native';

// Simple tooltip
<VTooltip content="This is a helpful tooltip">
  <Text>Press me</Text>
</VTooltip>

// With button
<VTooltip content="Click to see more details">
  <VButton>Info</VButton>
</VTooltip>
```

## Features
### Placement
```tsx
// Top (default)
<VTooltip content="Tooltip on top" placement="top">
  <VButton>Top</VButton>
</VTooltip>

// Bottom
<VTooltip content="Tooltip on bottom" placement="bottom">
  <VButton>Bottom</VButton>
</VTooltip>

// Left
<VTooltip content="Tooltip on left" placement="left">
  <VButton>Left</VButton>
</VTooltip>

// Right
<VTooltip content="Tooltip on right" placement="right">
  <VButton>Right</VButton>
</VTooltip>
```
### Custom Content
```tsx
// Rich content
<VTooltip
  content={
    <View>
      <Text style={tw`text-white font-bold mb-1`}>Title</Text>
      <Text style={tw`text-white text-xs`}>
        This is a longer description with multiple lines.
      </Text>
    </View>
  }
>
  <VButton>Details</VButton>
</VTooltip>

// With icon
<VTooltip
  content={
    <View style={tw`flex-row items-center gap-2`}>
      <Info size={16} color="white" />
      <Text style={tw`text-white`}>Important information</Text>
    </View>
  }
>
  <VButton>Info</VButton>
</VTooltip>
```
### Custom Colors
```tsx
// Custom background and text color
<VTooltip
  content="Success message"
  backgroundColor="#10B981"
  textColor="#FFFFFF"
>
  <VButton>Success</VButton>
</VTooltip>

// Warning style
<VTooltip
  content="Warning message"
  backgroundColor="#F59E0B"
  textColor="#000000"
>
  <VButton>Warning</VButton>
</VTooltip>

// Error style
<VTooltip
  content="Error occurred"
  backgroundColor="#EF4444"
  textColor="#FFFFFF"
>
  <VButton>Error</VButton>
</VTooltip>
```
### With/Without Arrow
```tsx
// With arrow (default)
<VTooltip content="Has arrow" withArrow>
  <VButton>With Arrow</VButton>
</VTooltip>

// Without arrow
<VTooltip content="No arrow" withArrow={false}>
  <VButton>No Arrow</VButton>
</VTooltip>
```
### Callbacks
```tsx
<VTooltip
  content="Tooltip content"
  onOpen={() => console.log('Tooltip opened')}
  onClose={() => console.log('Tooltip closed')}
>
  <VButton>Open</VButton>
</VTooltip>
```

## Props
| Prop            | Type                                | Default   | Description                          |
| --------------- | ----------------------------------- | --------- | ------------------------------------ |
| content         | string \| ReactNode                 | required  | Tooltip content                      |
| children        | ReactNode                           | required  | Trigger element                      |
| placement       | 'top' \| 'bottom' \| 'left' \| 'right' | 'top'     | Tooltip position relative to trigger |
| backgroundColor | string                              | '#374151' | Tooltip background color             |
| textColor       | string                              | '#FFFFFF' | Text color (only for string content) |
| withArrow       | boolean                             | true      | Show/hide arrow pointer              |
| onOpen          | () => void                          | -         | Callback when tooltip opens          |
| onClose         | () => void                          | -         | Callback when tooltip closes         |
| containerStyle  | ViewStyle                           | -         | Custom style for trigger container   |
| contentStyle    | ViewStyle                           | -         | Custom style for tooltip content     |


## Advanced Examples

### Info Button with Long Text
```tsx
<VTooltip
  content="This is a very long tooltip text that will automatically wrap and adjust its width based on screen edges. It will never be cut off."
  placement="top"
>
  <TouchableOpacity style={tw`bg-blue-500 w-10 h-10 rounded-full items-center justify-center`}>
    <Text style={tw`text-white font-bold`}>?</Text>
  </TouchableOpacity>
</VTooltip>
```
### Product Info Tooltip
```tsx
<VTooltip
  content={
    <View style={tw`gap-2`}>
      <Text style={tw`text-white font-bold text-base`}>Product Details</Text>
      <Text style={tw`text-white text-sm`}>-  Premium quality</Text>
      <Text style={tw`text-white text-sm`}>-  Free shipping</Text>
      <Text style={tw`text-white text-sm`}>-  30-day return policy</Text>
    </View>
  }
  placement="bottom"
  backgroundColor="#1F2937"
>
  <Image
    source={{ uri: product.image }}
    style={tw`w-20 h-20 rounded`}
  />
</VTooltip>
```
### Help Icon Tooltip
```tsx
<VTooltip
  content="Enter your email address to receive notifications"
  placement="right"
  backgroundColor="#3B82F6"
>
  <TouchableOpacity style={tw`ml-2`}>
    <HelpCircle size={20} color="#6B7280" />
  </TouchableOpacity>
</VTooltip>
```
### Status Indicator with Tooltip
```tsx
<View style={tw`flex-row items-center gap-2`}>
  <Text style={tw`text-gray-700`}>Server Status:</Text>
  <VTooltip
    content="All systems operational"
    placement="top"
    backgroundColor="#10B981"
  >
    <View style={tw`w-3 h-3 rounded-full bg-green-500`} />
  </VTooltip>
</View>
```
### Form Field Tooltip
```tsx
<View style={tw`mb-4`}>
  <View style={tw`flex-row items-center gap-2 mb-2`}>
    <Text style={tw`text-gray-700 font-semibold`}>Password</Text>
    <VTooltip
      content="Password must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number"
      placement="right"
      backgroundColor="#6B7280"
    >
      <Info size={16} color="#6B7280" />
    </VTooltip>
  </View>
  <VInput type="password" placeholder="Enter password" />
</View>
```
### Action Button with Tooltip
```tsx
<VTooltip
  content="Delete this item permanently"
  placement="left"
  backgroundColor="#EF4444"
  onOpen={() => console.log('Warning shown')}
>
  <TouchableOpacity style={tw`p-2 bg-red-100 rounded`}>
    <Trash2 size={20} color="#EF4444" />
  </TouchableOpacity>
</VTooltip>
```
## Smart Positioning
The tooltip automatically adjusts its position and width to prevent content from being cut off [web:57][web:63]:

- Top/Bottom placement: Full width from edge to edge (with padding)
- Left placement: Width from left edge to trigger button
- Right placement: Width from trigger button to right edge
- Arrow positioning: Always points to the trigger element even when tooltip is adjusted

### Notes
- Tooltip appears on press and dismisses when tapping outside [web:57][web:59]
- Uses Modal with transparent background for overlay
- Smart positioning prevents content from being cut off at screen edges [web:62][web:63]
- Arrow automatically adjusts to point at trigger element
- Works on both web and mobile platforms
- Content automatically wraps for long text
- 16px padding from screen edges for safety