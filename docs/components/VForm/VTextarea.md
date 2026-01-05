# VTextarea
Multi-line text input dengan optional auto-grow feature.

## Basic Usage
```tsx
import { VTextarea } from 'v-pack';
import { useState } from 'react';

function TextareaExample() {
  const [text, setText] = useState('');

  return (
    <VTextarea
      placeholder="Enter message"
      value={text}
      onChangeText={setText}
      rows={4}
    />
  );
}
```
### With Auto-Grow
```tsx
<VTextarea
  value={text}
  onChangeText={setText}
  placeholder="Type here..."
  autoGrow={true}  // Auto-expand as you type
  maxHeight={300}  // Maximum height before scrolling
  rows={3}
/>
```
### Different Variants
```tsx
<!-- Outline -->
<VTextarea
  variant="outline"
  placeholder="Outlined textarea"
  rows={4}
/>

<!-- Underline -->
<VTextarea
  variant="underline"
  placeholder="Underlined textarea"
  rows={4}
/>
```
### With Prefix/Suffix
```tsx
<VTextarea
  value={text}
  onChangeText={setText}
  prefix={<MessageSquare size={20} />}
  placeholder="Write feedback..."
  rows={4}
/>
```
### Error State
```tsx
<VTextarea
  value={text}
  onChangeText={setText}
  error={textError}
  placeholder="Enter text"
/>
```
## Props
| Prop         | Type                    | Default   | Description                 |
| ------------ | ----------------------- | --------- | --------------------------- |
| value        | string                  | -         | Text value                  |
| onChangeText | (text: string) => void  | -         | Change callback             |
| placeholder  | string                  | -         | Placeholder text            |
| variant      | 'outline' \| 'underline' | 'outline' | Textarea variant            |
| rows         | number                  | 4         | Number of visible rows      |
| autoGrow     | boolean                 | false     | Auto-expand height          |
| maxHeight    | number                  | -         | Max height before scrolling |
| prefix       | ReactNode               | -         | Prefix icon                 |
| suffix       | ReactNode               | -         | Suffix icon                 |
| error        | boolean                 | false     | Error state                 |
| disabled     | boolean                 | false     | Disable textarea            |