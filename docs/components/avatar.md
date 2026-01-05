# VAvatar
Display user avatars with image, initials, or icon fallbacks.

## Basic Usage
```tsx
import { VAvatar } from 'v-pack';

// With image
<VAvatar src="https://example.com/avatar.jpg" />

// With initials
<VAvatar fallback="John Doe" />

// With icon
<VAvatar icon={<User size={20} />} />

// Default
<VAvatar />
```

### Size
```tsx
<VAvatar fallback="John Doe" size="xs" />
<VAvatar fallback="John Doe" size="sm" />
<VAvatar fallback="John Doe" size="md" />
<VAvatar fallback="John Doe" size="lg" />
<VAvatar fallback="John Doe" size="xl" />
<VAvatar fallback="John Doe" size="2xl" />
```
### Variant
```tsx
// Rounded (default)
<VAvatar fallback="JD" variant="rounded" />

// Square
<VAvatar fallback="JD" variant="square" />
```

### Custom Color
```tsx
<VAvatar
  fallback="John Doe"
  backgroundColor="#FF5733"
  textColor="#FFFFFF"
/>
```

## Props

| Prop            | Type                                     | Default   | Description                  |
| --------------- | ---------------------------------------- | --------- | ---------------------------- |
| src             | string \| {uri: string} \| number        | -         | Image URL or local require() |
| icon            | ReactNode                                | -         | Custom icon component        |
| fallback        | string                                   | -         | Full name for initials       |
| size            | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' | 'md'      | Avatar size                  |
| variant         | 'rounded' \| 'square'                    | 'rounded' | Avatar shape                 |
| backgroundColor | string                                   | '#4A9B9F' | Background color             |
| textColor       | string                                   | '#FFFFFF' | Text/initials color          |


