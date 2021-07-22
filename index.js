/**
 * @format
 */

import "react-native-gesture-handler";
import { AppRegistry } from 'react-native';
import App from './src/app/components/App';
import { name as appName } from './app.json';
import "./mockServer";

AppRegistry.registerComponent(appName, () => App);
