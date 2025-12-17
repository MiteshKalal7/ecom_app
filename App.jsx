import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect } from "react";
import BootSplash from "react-native-bootsplash";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { Toast } from "./src/components";
import { toastRef } from "./src/config";
import { setToken, setUser } from "./src/redux/slice";
import {
  AccountScreen,
  CartScreen,
  LoginScreen,
  OrderHistoryScreen,
  ProductDetailScreen,
  ProductListScreen,
} from "./src/screens";

const Stack = createNativeStackNavigator();

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuth();
    BootSplash.hide({ fade: true });
  }, []);

  const checkAuth = async () => {
    const value = await AsyncStorage.getItem("user");
    const token = await AsyncStorage.getItem("token");

    if (token) {
      dispatch(setToken(token));
    }

    if (value) {
      let obj = JSON.parse(value);
      dispatch(setUser(obj));
    } else {
      dispatch(setUser(""));
    }
  };

  return (
    <GestureHandlerRootView
      style={{
        flex: 1,
      }}
    >
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="ProductList" component={ProductListScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
        </Stack.Navigator>
        <Toast {...{ ref: toastRef }} />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
