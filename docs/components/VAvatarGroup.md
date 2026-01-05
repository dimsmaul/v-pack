# VAvatarGroup
Display multiple avatars in a group with overlap.

## Basic Usage
```tsx
import { VAvatar, VAvatarGroup } from 'v-pack';

<VAvatarGroup max={3}>
  <VAvatar fallback="John Doe" />
  <VAvatar fallback="Jane Smith" />
  <VAvatar fallback="Bob Johnson" />
  <VAvatar fallback="Alice Brown" />
</VAvatarGroup>
```
Shows first 3 avatars with "+1" for remaining.

### Max & Spacing
```tsx
<VAvatarGroup max={4} spacing={-12}>
  <VAvatar fallback="JD" />
  <VAvatar fallback="JS" />
  <VAvatar fallback="BJ" />
  <VAvatar fallback="AB" />
  <VAvatar fallback="CD" />
</VAvatarGroup>
```

## Props
| Prop     | Type      | Default  | Description                          |
| -------- | --------- | -------- | ------------------------------------ |
| max      | number    | 3        | Max avatars to display               |
| spacing  | number    | -8       | Overlap spacing (negative = overlap) |
| children | ReactNode | required | Avatar components                    |