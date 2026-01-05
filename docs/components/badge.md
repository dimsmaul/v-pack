# VBadge
Display badges/counters on components.

## Basic Usage
```tsx
import { VBadge } from 'v-pack';

<VBadge content={5} />
<VBadge content="NEW" variant="success" />
<VBadge content={99} max={99} />
```

### With Children
```tsx
<VBadge content={5}>
  <Icon />
</VBadge>
```
Badge positioned on top-right of children.

### Variants
```tsx
<VBadge content={1} variant="primary" />
<VBadge content={1} variant="secondary" />
<VBadge content={1} variant="success" />
<VBadge content={1} variant="danger" />
<VBadge content={1} variant="info" />
```

### Dot
```tsx
<VBadge dot variant="danger">
  <Icon />
</VBadge>
```
Shows as dot instead of number.

### Sized
```tsx
<VBadge content={1} size="sm" />
<VBadge content={1} size="md" />
<VBadge content={1} size="lg" />
```

## Props
| Prop     | Type                                                    | Default  | Description                     |
| -------- | ------------------------------------------------------- | -------- | ------------------------------- |
| content  | string \| number                                        | -        | Badge content                   |
| variant  | 'primary' \| 'secondary' \| 'success' \| 'danger' \| 'info' | 'danger' | Badge color                     |
| size     | 'sm' \| 'md' \| 'lg'                                    | 'md'     | Badge size                      |
| showZero | boolean                                                 | false    | Show badge when content is 0    |
| max      | number                                                  | 99       | Max number before showing "99+" |
| dot      | boolean                                                 | false    | Show as dot                     |
| offset   | {top?: number, right?: number}                          | -        | Custom position offset          |
| hidden   | boolean                                                 | false    | Hide badge                      |
