# GeoIQ Frontend UI Kit

This project is a UI kit for GeoIQ's frontend. It's built with React, TypeScript, and Vite.

## Features

- React for building user interfaces
- TypeScript for static typing
- Vite for a fast development server and build tool
- PostCSS for processing CSS
- Storybook for developing components in isolation

## Scripts

Here are the npm scripts you can run: (Dont for get to login before publishing run `npm login`)

You should use `yarn storybook` to start the Storybook development server.

- `npm run dev`: Starts the Vite development server
- `npm run build`: Builds the project for production
- `npm run build:styles`: Builds the styles and copies the `ui-kit-preset.js` file to the `dist` folder
- `npm run lint`: Lints the project with ESLint
- `npm run preview`: Previews the production build
- `npm run watch-build`: Watches the `src` folder and builds the project when files change
- `npm run storybook`: Starts the Storybook development server
- `npm run build-storybook`: Builds Storybook for production
- `npm run npm-publish` : Publishes the package, Dont forget to increment version number manually
- `npm run npm-publish:patch`: Increments the patch version, builds the project, and publishes it to the npm registry
- `npm run npm-publish:minor`: Increments the minor version, builds the project, and publishes it to the npm registry
- `npm run npm-publish:major`: Increments the major version, builds the project, and publishes it to the npm registry

## Getting Started

1. import `ui-kit-preset.js` from `dist` folder and add it to your tailwind config file in the presets.
2. start importing the components from `geoiq-frontend-ui-kit`.

## Components

This UI kit includes the following components:

- Button
- Input
- Checkbox
- Radio
- Dropdown
- Modal
- Tooltip
- Table

Each component has its own props for customization. Please refer to the individual component documentation for more details.

## License

This project is licensed under the MIT License.
