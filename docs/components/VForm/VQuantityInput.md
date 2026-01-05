# VQuantityInput
Quantity input dengan increment/decrement buttons dan delete option.

## Basic Usage
```tsx
import { VQuantityInput } from 'v-pack';
import { useState } from 'react';

function QuantityExample() {
  const [quantity, setQuantity] = useState(1);

  return (
    <VQuantityInput
      value={quantity}
      onValueChange={setQuantity}
    />
  );
}
```
### With Min/Max Values
```tsx
<VQuantityInput
  value={quantity}
  onValueChange={setQuantity}
  min={1}
  max={99}
  step={1}
/>
```
### With Delete Button
```tsx
<VQuantityInput
  value={quantity}
  onValueChange={setQuantity}
  showDelete={true}  // Shows delete when quantity = min
  onDelete={() => removeItem()}
  min={1}
/>
```
### Different Sizes
```tsx
<VQuantityInput value={quantity} onValueChange={setQuantity} size="sm" />
<VQuantityInput value={quantity} onValueChange={setQuantity} size="md" />
<VQuantityInput value={quantity} onValueChange={setQuantity} size="lg" />
```
### Disabled State
```tsx
<VQuantityInput
  value={quantity}
  onValueChange={setQuantity}
  disabled={true}
/>
```
## Props
| Prop          | Type                    | Default | Description               |
| ------------- | ----------------------- | ------- | ------------------------- |
| value         | number                  | 1       | Current quantity          |
| onValueChange | (value: number) => void | -       | Change callback           |
| min           | number                  | 1       | Minimum value             |
| max           | number                  | 999     | Maximum value             |
| step          | number                  | 1       | Increment/decrement step  |
| disabled      | boolean                 | false   | Disable input             |
| showDelete    | boolean                 | false   | Show delete button at min |
| onDelete      | () => void              | -       | Delete callback           |
| size          | 'sm' \| 'md' \| 'lg'    | 'md'    | Component size            |