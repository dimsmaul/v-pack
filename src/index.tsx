import VButton from './components/VButton/VButton';
import VAccordion, {
  VAccordionItem,
  VAccordionContent,
  VAccordionTrigger,
} from './components/VAccordion/VAccordion';
import VTabs, {
  VTabsList,
  VTabsTrigger,
  VTabsContent,
} from './components/VTabs/VTabs';
import VBanner from './components/VBanner/VBanner';
import {
  VSnackbarProvider,
  useSnackbar,
} from './components/VSnackbar/VSnackbar';
import VDrawer from './components/VDrawer/VDrawer';
import VDialog from './components/VDialog/VDialog';
import VWheelPicker from './components/VPicker/VWheelPicker';
import VDatePicker from './components/VPicker/VDatePicker';
import VTimePicker from './components/VPicker/VTimePicker';
import VInput from './components/VForm/VInput';
import VPasswordInput from './components/VForm/VPasswordInput';
import VTextarea from './components/VForm/VTextArea';
import {
  VForm,
  VFormField,
  VFormItem,
  VFormLabel,
  VFormControl,
  VFormDescription,
  VFormMessage,
} from './components/VForm/VForm';

export {
  // Button
  VButton,

  // Accordion
  VAccordion,
  VAccordionItem,
  VAccordionContent,
  VAccordionTrigger,

  // Tabs
  VTabs,
  VTabsList,
  VTabsTrigger,
  VTabsContent,

  // Banner
  VBanner,

  // Snackbar
  VSnackbarProvider,
  useSnackbar,

  // Drawer
  VDrawer,

  // Dialog
  VDialog,

  // WheelPicker
  VWheelPicker,
  VDatePicker,
  VTimePicker,

  // Form
  VForm,
  VFormField,
  VFormItem,
  VFormLabel,
  VFormControl,
  VFormDescription,
  VFormMessage,

  // Input
  VInput,
  VPasswordInput,

  // Textarea
  VTextarea,
};

// src/components/VDatePickerInput/index.ts
export { default as VDatePickerInput } from './components/VForm/VDatePickerInput';
export type { VDatePickerInputProps } from './components/VForm/VDatePickerInput';

// src/components/VForm/VCheckbox
export { default as VCheckbox } from './components/VForm/VCheckbox';
export type { VCheckboxProps } from './components/VForm/VCheckbox';

// src/components/VForm/VToggle
export { default as VToggle } from './components/VForm/VToggle';
export type { VToggleProps } from './components/VForm/VToggle';

// src/components/VForm/VSlider
export { default as VSlider } from './components/VForm/VSlider';
export type { VSliderProps } from './components/VForm/VSlider';

// src/components/VForm/VQuantityInput
export { default as VQuantityInput } from './components/VForm/VQuantityInput';
export type { VQuantityInputProps } from './components/VForm/VQuantityInput';

// src/components/VBadge/index.ts
export { default as VBadge } from './components/VBadge/VBadge';
export type { VBadgeProps } from './components/VBadge/VBadge';

// src/components/VTooltip/index.ts
export { default as VTooltip } from './components/VTooltip/VTooltip';
export type { VTooltipProps } from './components/VTooltip/VTooltip';

// src/components/VCalendar/index.ts
export { default as VCalendar } from './components/VPicker/VCalendar';
export type { VCalendarProps } from './components/VPicker/VCalendar';

// src/components/VCalendarPickerInput/index.ts
export {
  default as VCalendarPickerInput,
  type VCalendarPickerInputProps,
} from './components/VForm/VCalendarPickerInput';

// src/components/VCalendarRange/index.ts
export { default as VCalendarRange } from './components/VPicker/VCalendarRange';
export type { VCalendarRangeProps } from './components/VPicker/VCalendarRange';

// src/components/VCalendarRangePickerInput/index.ts
export {
  default as VCalendarRangePickerInput,
  type VCalendarRangePickerInputProps,
} from './components/VForm/VCalendarRangePickerInput';

// src/components/VPackProvider/index.ts
export { default as VPackProvider } from './components/VPackProvider/VPackProvider';
export type { VPackProviderProps } from './components/VPackProvider/VPackProvider';

// src/components/VAvatar/index.ts
export {
  VAvatar,
  type VAvatarProps,
  type AvatarSize,
  type AvatarVariant,
} from './components/VAvatar/VAvatar';
export {
  VAvatarGroup,
  type VAvatarGroupProps,
} from './components/VAvatar/VGroupAvatar';

// src/components/VSelectPickerInput/index.ts
export {
  default as VSelectInput,
  type VSelectInputProps,
  type SelectOption,
} from './components/VForm/VSelectInput';

// src/components/VMultipleSelectPickerInput/index.ts
export {
  default as VMultipleSelectInput,
  type VMultipleSelectInputProps,
  type MultiSelectOption,
} from './components/VForm/VMultipleSelectInput';

/**
 * Theme Provider
 */

export { ThemeProvider, useTheme } from './theme/ThemeProvider';
