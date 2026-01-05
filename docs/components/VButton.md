# VButton
Customizable button component with multiple variants and sizes.

## Basic Usage
```tsx
import { VButton } from 'v-pack';

<VButton onPress={() => {}}>Click Me</VButton>
```

### Variants
```tsx
<VButton variant="standard">Standard</VButton>
<VButton variant="outline">Outline</VButton>
<VButton variant="ghost">Ghost</VButton>
```

### Types
```tsx
<VButton type="primary">Primary</VButton>
<VButton type="secondary">Secondary</VButton>
<VButton type="success">Success</VButton>
<VButton type="warning">Warning</VButton>
<VButton type="danger">Danger</VButton>
```

### Sized
```tsx
<VButton size="small">Small</VButton>
<VButton size="medium">Medium</VButton>
<VButton size="large">Large</VButton>
```

### Disabled
```tsx
<VButton disabled>Disabled</VButton>
```

## Props
| Prop     | Type                                                       | Default    | Description       |
| -------- | ---------------------------------------------------------- | ---------- | ----------------- |
| variant  | 'standard' \| 'outline' \| 'ghost'                         | 'standard' | Button variant    |
| size     | 'small' \| 'medium' \| 'large'                             | 'medium'   | Button size       |
| type     | 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'danger' | 'primary'  | Button type/color |
| disabled | boolean                                                    | false      | Disable button    |
| onPress  | () => void                                                 | -          | Press handler     |
| children | ReactNode                                                  | required   | Button label      |