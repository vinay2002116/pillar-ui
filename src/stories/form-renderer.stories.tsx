import { FormRenderer, FormRendererProps } from '@/components/ui/form-renderer'
import { ImageEditor } from '@/components/ui/image-editor'

import { FormStructure } from '@/components/ui/form-renderer/form.types'
import { Meta, StoryObj } from '@storybook/react/*'
import React, { useRef, useState } from 'react'
import { Dialog } from '@/components/organisms/dialog'
import { Button } from '@/components/atoms/button'
import { Sheet } from '@/components/organisms/sheet'

const meta = {
  title: 'ui/Form Renderer',
  component: FormRenderer,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FormRenderer>

export default meta

type Story = StoryObj<FormRendererProps>

const formStructure = {
  steps: [
    {
      id: 'step1',
      name: 'Personal Information',
      sections: [
        {
          id: 'section1',
          name: 'Basic Details',
          fields: [
            {
              id: 'name',
              name: 'Full Name',
              required: true,
              placeholder: 'Enter your full name',
              type: 'short-text',
            },
            {
              id: 'email',
              name: 'Email Address',
              required: true,
              placeholder: 'example@domain.com',
              type: 'email',
            },
            {
              id: 'bio',
              name: 'Biography',
              required: false,
              placeholder: 'Tell us about yourself',
              type: 'long-text',
            },
            {
              id: 'age',
              name: 'Age',
              required: true,
              placeholder: 'Enter your age',
              type: 'number',
            },
            {
              id: 'phoneNumber',
              name: 'Phone Number',
              required: true,
              placeholder: 'Enter your mobile number',
              type: 'mobile-number',
            },
            {
              id: 'source',
              name: 'Source Test',
              required: true,
              type: 'checkbox-group',
              options: ['S1', 'S2', 'S3', 'Prefer not to say'],
            },
            {
              id: 'source',
              name: 'Source Test',
              required: true,
              type: 'checkbox-group',
              options: ['S1', 'S2', 'S3', 'Prefer not to say'],
            },
            {
              id: 'source',
              name: 'Source Test',
              required: true,
              type: 'checkbox-group',
              options: ['S1', 'S2', 'S3', 'Prefer not to say'],
            },
            {
              id: 'source',
              name: 'Source Test',
              required: true,
              type: 'checkbox-group',
              options: ['S1', 'S2', 'S3', 'Prefer not to say'],
            },
            {
              id: 'createdAt',
              name: 'Created At',
              required: true,
              type: 'date-picker',
            },
          ],
        },
      ],
    },
    {
      id: 'step2',
      name: 'Preferences',
      sections: [
        {
          id: 'section2',
          name: 'Selection Options',
          fields: [
            {
              id: 'country',
              name: 'Country',
              required: true,
              placeholder: 'Select your country',
              type: 'single-combobox',
              options: [
                'USA',
                'Canada',
                'UK',
                'Australia',
                'Germany',
                'France',
              ],
            },
            {
              id: 'interests',
              name: 'Interests',
              required: false,
              placeholder: 'Select your interests',
              type: 'multi-combobox',
              options: [
                'Technology',
                'Sports',
                'Art',
                'Music',
                'Travel',
                'Cooking',
              ],
            },
            {
              id: 'gender',
              name: 'Gender',
              required: true,
              type: 'radio-group',
              options: ['Male', 'Female', 'Non-binary', 'Prefer not to say'],
            },

            {
              id: 'referralSource',
              name: 'How did you hear about us?',
              required: true,
              type: 'radio-group-with-optional-input',
              options: ['Social Media', 'Friend', 'Advertisement', 'Other'],
              inputFieldPlaceholder: 'Please specify',
              inputTriggerOptionValue: 'Other',
            },
          ],
        },
      ],
    },
    {
      id: 'step3',
      name: 'Media Uploads',
      sections: [
        {
          id: 'section3',
          name: 'Images & Videos',
          fields: [
            {
              id: 'profilePicture',
              name: 'Profile Picture',
              required: true,
              placeholder: 'Upload a profile picture',
              type: 'single-image-picker',
            },
            {
              id: 'gallery',
              name: 'Photo Gallery',
              required: false,
              placeholder: 'Upload multiple photos',
              type: 'multi-image-picker',
            },
            {
              id: 'taggedPhotos',
              name: 'Tagged Photos',
              required: false,
              placeholder: 'Upload and tag photos',
              options: ['a', 'b', 'c'],
              type: 'taggable-multi-image-picker',
            },
            {
              id: 'taggedPhotos2',
              name: 'Captioned Photos',
              required: false,
              max_items: 5,
              placeholder: 'Upload and caption photos',
              type: 'taggable-multi-image-picker-with-input',
            },
            {
              id: 'introVideo',
              name: 'Introduction Video',
              required: false,
              placeholder: 'Upload an introduction video',
              type: 'single-video-picker',
            },
            {
              id: 'videoFromUrl',
              name: "Import from URL",
              placeholder: 'Video URL',
              required: true,
              type: 'single-video-picker-with-input',
            },
            {
              id: 'projectVideos',
              name: 'Project Videos',
              required: false,
              placeholder: 'Upload project videos',
              type: 'multi-video-picker',
            },
          ],
        },
      ],
    },
    {
      id: 'step4',
      name: 'Educational Background',
      sections: [
        {
          id: 'section4',
          name: 'Education',
          fields: [
            {
              id: 'educationHistory',
              name: 'Education History',
              required: true,
              type: 'repeatable-group-field',
              options: [
                {
                  id: 'institution',
                  name: 'Institution Name',
                  required: true,
                  placeholder: 'Enter institution name',
                  type: 'short-text',
                },
                {
                  id: 'degree',
                  name: 'Degree',
                  required: true,
                  placeholder: 'Enter degree name',
                  type: 'short-text',
                },
                {
                  id: 'graduationYear',
                  name: 'Graduation Year',
                  required: true,
                  placeholder: 'Enter graduation year',
                  type: 'number',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  values: {
    name: 'Test',
    email: 'Test@gmail.com',
    bio: 'dasd',
    age: '123',
    phoneNumber: '1234567890',
    country: 'USA',
    interests: 'Technology,Art,Music',
    source: 'S1',
    gender: 'Male',
    createdAt: 1749709732,
    referralSource: {
      radio_value: 'Other',
      input_value: 'ddddd',
    },
    profilePicture: {
      message: '',
      private_url:
        'gs://geoiq-retail-app-stg-v2/bdapp/1/077ca65b-fbbd-4670-b3b3-13695b48d803.png',
      public_url: 'https://picsum.photos/800/600',
      original_private_url: '',
    },
    gallery: [
      {
        private_url:
          'gs://geoiq-retail-app-stg-v2/bdapp/1/a3fa55ff-b0ec-4be9-9006-9d09b4ea62a4.png',
        public_url: 'https://picsum.photos/800/600',
        original_private_url: '',
      },
      {
        private_url:
          'gs://geoiq-retail-app-stg-v2/bdapp/1/7087f520-f62a-44d1-b19e-3f9936e5e193.png',
        public_url: 'https://picsum.photos/800/600',
        original_private_url: '',
      },
    ],
    taggedPhotos: [
      {
        private_url:
          'gs://geoiq-retail-app-stg-v2/bdapp/1/82e19d8f-ed4c-4a51-a437-d5280134ccd0.png',
        public_url: 'https://picsum.photos/800/600',
        tag: 'a v v v v v v v v vv ',
        original_private_url: '',
      },
      {
        private_url:
          'gs://geoiq-retail-app-stg-v2/bdapp/1/82e19d8f-ed4c-4a51-a437-d5280134ccd0.png',
        public_url: 'https://picsum.photos/800/600',
        tag: 'a',
        original_private_url: '',
      },
      {
        private_url:
          'gs://geoiq-retail-app-stg-v2/bdapp/1/82e19d8f-ed4c-4a51-a437-d5280134ccd0.png',
        public_url: 'https://picsum.photos/800/600',
        tag: 'a',
        original_private_url: '',
      },
      {
        private_url:
          'gs://geoiq-retail-app-stg-v2/bdapp/1/82e19d8f-ed4c-4a51-a437-d5280134ccd0.png',
        public_url: 'https://picsum.photos/800/600',
        tag: 'adasd dasdas',
        original_private_url: '',
      },
      {
        private_url:
          'gs://geoiq-retail-app-stg-v2/bdapp/1/82e19d8f-ed4c-4a51-a437-d5280134ccd0.png',
        public_url: 'https://picsum.photos/800/600',
        tag: 'adasdasdasdas',
        original_private_url: '',
      },
      {
        private_url:
          'gs://geoiq-retail-app-stg-v2/bdapp/1/82e19d8f-ed4c-4a51-a437-d5280134ccd0.png',
        public_url: 'https://picsum.photos/800/600',
        tag: 'adasdasdasd',
        original_private_url: '',
      },
      {
        private_url:
          'gs://geoiq-retail-app-stg-v2/bdapp/1/82e19d8f-ed4c-4a51-a437-d5280134ccd0.png',
        public_url: 'https://picsum.photos/800/600',
        tag: 'a',
        original_private_url: '',
      },
      {
        private_url:
          'gs://geoiq-retail-app-stg-v2/bdapp/1/82e19d8f-ed4c-4a51-a437-d5280134ccd0.png',
        public_url: 'https://picsum.photos/800/600',
        tag: 'a',
        original_private_url: '',
      },
    ],
    taggedPhotos2: [
      {
        private_url:
          'gs://geoiq-retail-app-stg-v2/bdapp/1/82e19d8f-ed4c-4a51-a437-d5280134ccd0.png',
        public_url: 'https://picsum.photos/800/600',
        tag: 'a v v v v v v v v vv ',
        original_private_url: '',
      },
      {
        private_url:
          'gs://geoiq-retail-app-stg-v2/bdapp/1/82e19d8f-ed4c-4a51-a437-d5280134ccd0.png',
        public_url: 'https://picsum.photos/800/600',
        tag: 'a',
        original_private_url: '',
      },
    ],
    introVideo: {
      private_url:
        'gs://geoiq-retail-app-stg-v2/bdapp/1/0402cf0b-fa81-4593-987d-8a4aaa129e01.mp4',
      public_url:
        'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      original_private_url: '',
    },
    projectVideos: [
      {
        private_url:
          'gs://geoiq-retail-app-stg-v2/bdapp/1/f4240af4-9cc5-42c6-99ba-869405167514.mp4',
        public_url:
          'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        original_private_url: '',
      },
    ],
    'educationHistory||0||institution': 'asda',
    'educationHistory||0||degree': 'dasd',
    'educationHistory||0||graduationYear': '123',
    'educationHistory||1||institution': '1231',
    'educationHistory||1||degree': '1233',
    'educationHistory||1||graduationYear': '123',
  },
} as FormStructure

export const EditMode: Story = {
  render: (args) => (
    <div
      className="relative h-screen w-96"
      style={
        {
          // width: 480,
          // overflow: 'scroll',
        }
      }
    >
      <FormRenderer {...args} />
    </div>
  ),
  args: {
    structure: formStructure,
    onSubmit: () => {},
    // onAssetUpload: (file: File) => any,
    initialValues: formStructure.values,
    readOnly: false,
    isSubmitting: false,
  },
}

export const ReadMode: Story = {
  render: (args) => (
    <div
      style={{
        width: 480,
        overflow: 'scroll',
      }}
    >
      <FormRenderer {...args} />
    </div>
  ),
  args: {
    structure: formStructure,
    onSubmit: () => {},
    // onAssetUpload: (file: File) => any,
    initialValues: formStructure.values,
    readOnly: true,
    isSubmitting: false,
  },
}

export const WithImageEditor: Story = {
  render: (args) => {
    const [isImageEditorVisible, setImageEditorVisible] = useState(false)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const currentImage = useRef<any>(null)

    return (
      <div
        style={{
          width: 480,
          overflow: 'scroll',
        }}
      >
        <FormRenderer
          {...args}
          onToggleImageEditor={({ imageUrl, index, onReplaceImage }) => {
            currentImage.current = { imageUrl, index, onReplaceImage }
            setImageEditorVisible(true)
          }}
        />
        {isImageEditorVisible && (
          <Dialog
            open={true}
            trigger={null}
            body={
              <>
                <Button
                  onClick={() => {
                    currentImage.current.onReplaceImage(
                      {
                        private_url: currentImage.current.imageUrl,
                        public_url: currentImage.current.imageUrl,
                      },
                      currentImage.current.index
                    )
                    setImageEditorVisible(false)
                  }}
                  variant={'primary'}
                  // children= 'Primary Button',
                  title={'close'}
                />
                <ImageEditor
                  stickers={[
                    'https://frontend-static-files.geoiq.io/strapi/Ellipse_2803_eb823536ae/Ellipse_2803_eb823536ae.png',
                    'https://frontend-static-files.geoiq.io/strapi/Rectangle_5829_aa47e31c68/Rectangle_5829_aa47e31c68.png',
                    'https://frontend-static-files.geoiq.io/strapi/Arrow_Double_Staight_0caa722046/Arrow_Double_Staight_0caa722046.png',
                  ]}
                  backgroundImage={currentImage.current.imageUrl}
                  onSave={() => {
                    setImageEditorVisible(false)
                  }}
                />
              </>
            }
          />
        )}
      </div>
    )
  },
  args: {
    structure: formStructure,
    onSubmit: () => {},
    // onAssetUpload: (file: File) => any,
    initialValues: formStructure.values,
    readOnly: false,
    isSubmitting: false,
  },
}

export const WithSheet: Story = {
  render: (args) => {
    const [isImageEditorVisible, setImageEditorVisible] = useState(false)
    const [open, setOpen] = React.useState(false)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const currentImage = useRef<any>(null)

    return (
      <Sheet
        {...args}
        contentProps={{ className: 'bg-light-1' }}
        bodyProps={{ className: 'p-2 pb-0' }}
        // title="Form Renderer"
        content={
          <div
            className="h-full"
            // style={{

            //   width: 480,
            //   overflow: 'scroll',
            // }}
          >
            <FormRenderer
              {...args}
              onToggleImageEditor={({ imageUrl, index, onReplaceImage }) => {
                currentImage.current = { imageUrl, index, onReplaceImage }
                setImageEditorVisible(true)
              }}
            />
            {isImageEditorVisible && (
              <Dialog
                open={true}
                trigger={null}
                body={
                  <>
                    <Button
                      onClick={() => {
                        currentImage.current.onReplaceImage(
                          {
                            private_url: currentImage.current.imageUrl,
                            public_url: currentImage.current.imageUrl,
                          },
                          currentImage.current.index
                        )
                        setImageEditorVisible(false)
                      }}
                      variant={'primary'}
                      // children= 'Primary Button',
                      title={'close'}
                    />
                    <ImageEditor
                      stickers={[
                        'https://frontend-static-files.geoiq.io/strapi/Ellipse_2803_eb823536ae/Ellipse_2803_eb823536ae.png',
                        'https://frontend-static-files.geoiq.io/strapi/Rectangle_5829_aa47e31c68/Rectangle_5829_aa47e31c68.png',
                        'https://frontend-static-files.geoiq.io/strapi/Arrow_Double_Staight_0caa722046/Arrow_Double_Staight_0caa722046.png',
                      ]}
                      backgroundImage={currentImage.current.imageUrl}
                      onSave={() => {
                        setImageEditorVisible(false)
                      }}
                    />
                  </>
                }
              />
            )}
          </div>
        }
        open={open}
        onOpenChange={(open) => {
          setOpen(open)
        }}
        onInteractOutside={() => setOpen(false)}
        trigger={
          <Button
            variant="secondary"
            onClick={() => {
              setOpen(true)
            }}
          >
            Toggle sheet
          </Button>
        }
      />
    )
  },
  args: {
    structure: formStructure,
    onSubmit: () => {},
    // onAssetUpload: (file: File) => any,
    initialValues: formStructure.values,
    readOnly: false,
    isSubmitting: false,
  },
}
