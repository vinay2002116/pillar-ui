import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';
import './manager.css';

addons.setConfig({
  theme: {
    ...themes.normal, // or themes.dark if you prefer a dark theme
    brandTitle: 'Pillar UI', // Replace with your company name
    brandUrl: '', // Optional: link to your company's website
    brandImage: '/assets/logo.png', // Optional: link to your company logo

  },
});