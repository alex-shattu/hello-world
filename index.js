import { AppRegistry } from 'react-native';
import App from './App2';
// import App from './App1';
import { name as appName } from './app.json';
console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
