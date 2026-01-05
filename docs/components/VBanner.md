# VBanner
Display alert banners with icon and message.

## Basic Usage
```tsx
import { VBanner } from 'v-pack';

<VBanner type="info" message="This is an info message" />
<VBanner type="success" message="Operation successful" />
<VBanner type="warning" message="Please review before proceeding" />
<VBanner type="danger" message="An error occurred" />
```

### With Title
```tsx
<VBanner
  type="warning"
  title="Warning"
  message="Please check your input"
/>
```

### Custom Icon
```tsx
import { AlertCircle } from 'lucide-react-native';

<VBanner
  type="danger"
  message="Error message"
  icon={AlertCircle}
/>
```

### Types
```tsx
<VBanner type="danger" message="Danger" />
<VBanner type="info" message="Info" />
<VBanner type="warning" message="Warning" />
<VBanner type="success" message="Success" />
<VBanner type="secondary" message="Secondary" />
<VBanner type="primary" message="Primary" />
```

| Prop     | Type                                                                | Default  | Description           |
| -------- | ------------------------------------------------------------------- | -------- | --------------------- |
| type     | 'danger' \| 'info' \| 'warning' \| 'success' \| 'secondary' \| 'primary' | 'info'   | Banner type           |
| title    | string                                                              | -        | Optional title        |
| message  | string                                                              | required | Banner message        |
| icon     | LucideIcon                                                          | auto     | Custom icon component |
| children | ReactNode                                                           | -        | Additional content    |