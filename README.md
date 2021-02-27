# OMM-CLIENT

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started

If using docker refer to [docker](#Docker).

For development first install the [requirements](#Requirements) and then do the following steps:
1. Install npm packages with `yarn`.
2. Start the development server with `yarn start`.
3. The application should be available on `localhost:3000`

## Requirements
- yarn
- node
## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Docker

### build
build the docker container

`docker build .`

### run

Run the corresponding docker container after it is build.
`%container-tag%` corresponds to the tag of the build container.

`docker run -p 3000:80 %container-tag%`

## Dependencies

| Name        | License       | Description  | Link |
| ----------- | ------------- | ------------ | ---- |
| @tensorflow-models/mobilenet | Apache-2.0 | MobileNets are small, low-latency, low-power models parameterized to meet the resource constraints of a variety of use cases. They can be built upon for classification, detection, embeddings and segmentation similar to how other popular large scale models, such as Inception, are used. | https://www.npmjs.com/package/@tensorflow-models/mobilenet |
| @tensorflow/tfjs-converter | Apache-2.0 | TensorFlow.js converter is an open source library to load a pretrained TensorFlow SavedModel or TensorFlow Hub module into the browser and run inference through TensorFlow.js. | https://www.npmjs.com/package/@tensorflow/tfjs-converter | @material-ui/core | MIT | React components for faster and simpler web development. Build your own design system, or start with Material Design. | https://www.npmjs.com/package/@material-ui/core |
| @tensorflow/tfjs-core | Apache-2.0 | A part of the TensorFlow.js ecosystem, this repo hosts @tensorflow/tfjs-core, the TensorFlow.js Core API, which provides low-level, hardware-accelerated linear algebra operations and an eager API for automatic differentiation. | https://www.npmjs.com/package/@tensorflow/tfjs-core |
| bootstrap | MIT | Sleek, intuitive, and powerful front-end framework for faster and easier web development. | https://www.npmjs.com/package/bootstrap |
| react | MIT | React is a JavaScript library for creating user interfaces. | https://www.npmjs.com/package/react |
| react-bootstrap | MIT | Bootstrap 4 components built with React. | https://www.npmjs.com/package/react-bootstrap |
| react-dom | MIT | This package serves as the entry point to the DOM and server renderers for React. It is intended to be paired with the generic React package, which is shipped as react to npm. | https://www.npmjs.com/package/react-dom |
| react-scripts | MIT | This package includes scripts and configuration used by Create React App. | https://www.npmjs.com/package/react-scripts |
| react-router-dom | MIT | DOM bindings for React Router. | https://www.npmjs.com/package/react-router-dom |
| typescript | Apache-2.0 | TypeScript is a language for application-scale JavaScript. TypeScript adds optional types to JavaScript that support tools for large-scale JavaScript applications for any browser, for any host, on any OS. TypeScript compiles to readable, standards-based JavaScript. | https://www.npmjs.com/package/typescript |
| web-vitals | Apache-2.0 | The web-vitals library is a tiny (~1K), modular library for measuring all the Web Vitals metrics on real users, in a way that accurately matches how they're measured by Chrome and reported to other Google tools (e.g. Chrome User Experience Report, Page Speed Insights, Search Console's Speed Report). | https://www.npmjs.com/package/web-vitals |
| react-color | MIT | Color Pickers from Sketch, Photoshop, Chrome, Github, Twitter & more | https://www.npmjs.com/package/react-color |
| react-icons | MIT | Include popular icons in your React projects easily with react-icons, which utilizes ES6 imports that allows you to include only the icons that your project is using. | https://www.npmjs.com/package/react-icons |
| react-webcam | MIT | Webcam component for React. | https://www.npmjs.com/package/react-webcam |
| recharts | MIT | Recharts is a Redefined chart library built with React and D3. | https://www.npmjs.com/package/recharts | 
| react-share | MIT | Social media share buttons and share counts for React. | https://www.npmjs.com/package/react-share |

Additionally the corresponding typescript types from https://github.com/DefinitelyTyped/DefinitelyTyped and the corresponding testing libraries from https://testing-library.com/. 
