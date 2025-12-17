/**
 * @format
 */

import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";
import { Providers } from "./src/redux/providers";

const Root = () => (
  <Providers>
    <App />
  </Providers>
);

AppRegistry.registerComponent(appName, () => Root);
