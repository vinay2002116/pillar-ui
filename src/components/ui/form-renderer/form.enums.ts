export enum FormFieldType {
  // Text fields
  SHORT_TEXT = 'short-text',
  EMAIL = 'email',
  LONG_TEXT = 'long-text',
  // Number fields
  NUMBER = 'number',
  MOBILE_NUMBER = 'mobile-number',
  DATE_PICKER = 'date-picker',

  // Selection fields
  SINGLE_COMBOBOX = 'single-combobox',
  MULTI_COMBOBOX = 'multi-combobox',
  RADIO_GROUP = 'radio-group',
  RADIO_GROUP_WITH_OPTIONAL_INPUT = 'radio-group-with-optional-input',
  CHECKBOX_GROUP = 'checkbox-group',

  // Upload fields
  SINGLE_IMAGE_PICKER = 'single-image-picker',
  MULTI_IMAGE_PICKER = 'multi-image-picker',
  TAGGABLE_MULTI_IMAGE_PICKER = 'taggable-multi-image-picker',
  SINGLE_VIDEO_PICKER = 'single-video-picker',
  MULTI_VIDEO_PICKER = 'multi-video-picker',
  SINGLE_VIDEO_PICKER_WITH_INPUT = 'single-video-picker-with-input',
  TAGGABLE_MULTI_IMAGE_PICKER_WITH_INPUT = 'taggable-multi-image-picker-with-input',

  REPEATABLE_GROUP_FIELD = 'repeatable-group-field',
}
