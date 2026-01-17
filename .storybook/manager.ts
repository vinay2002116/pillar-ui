import { addons } from '@storybook/manager-api';
import { themes } from '@storybook/theming';
import './manager.css'; 

addons.setConfig({
  theme: {
    ...themes.normal, // or themes.dark if you prefer a dark theme
    brandTitle: 'GeoIQ', // Replace with your company name
    brandUrl: 'https://geoiq.ai', // Optional: link to your company's website
    brandImage: 'https://geoiq.ai/blog/wp-content/uploads/2024/05/cropped-geoIQ-logo-350x100-1.png', // Optional: link to your company logo
    
  },
});