declare module "*.svg";
declare module "*.png";

type ReactotronReactNative = import("reactotron-react-native").ReactotronReactNative;
type Reactotron<T> = import("reactotron-core-client").Reactotron<T>;

interface Console {
    tron: Reactotron<ReactotronReactNative> & ReactotronReactNative;
}
