import Reactotron from "reactotron-react-native";
import AsyncStorage from "@react-native-community/async-storage";
import ReactotronFlipper from "reactotron-react-native/dist/flipper";
import { reactotronRedux } from "reactotron-redux";
import sagaPlugin from "reactotron-redux-saga";

const reactotron = Reactotron.setAsyncStorageHandler(AsyncStorage) // AsyncStorage would either come from `react-native` or `@react-native-community/async-storage` depending on where you get it from
    .configure({
        name: "BizMobilePlus",
        createSocket: (path) => new ReactotronFlipper(path),
    }) // controls connection & communication settings
    .use(reactotronRedux())
    .use(sagaPlugin())
    .useReactNative({
        networking: {
            ignoreUrls: /clients3\.google\.com/,
        },
    }) // add all built-in react native plugins
    .connect(); // let's connect!
export default reactotron;

