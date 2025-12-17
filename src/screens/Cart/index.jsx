import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useNavigation } from "@react-navigation/native";
import moment from "moment";
import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Header, NoData } from "../../components";
import { deviceWidth, insets, showToast } from "../../config";
import { colors } from "../../config/colors";
import { globalStyles } from "../../config/styles";
import { setCart } from "../../redux/slice";
import Item from "./Item";

export default function Cart() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);

  const storage = `${user?.id}_order_history`;

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  const calculateTotal = () => {
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
    setTotal(totalPrice);
  };

  const onPlaceOrder = async () => {
    const orderID = moment().valueOf().toString();

    const prevOrders = await AsyncStorage.getItem(storage);
    const orders = prevOrders ? JSON.parse(prevOrders) : [];

    const newOrder = {
      orderId: orderID.toString(),
      createdAt: orderID,
      total: total,
      products: cart,
    };

    orders.unshift(newOrder);

    await AsyncStorage.setItem(storage, JSON.stringify(orders));

    dispatch(setCart([]));
    showToast("Order placed successfully!");
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [
          {
            name: "ProductList",
            state: {
              index: 1,
            },
          },
          {
            name: "OrderHistory",
          },
        ],
      })
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <FlatList
        data={cart}
        contentContainerStyle={{
          flex: 1,
          paddingHorizontal: 20,
          marginTop: 10,
        }}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Item item={item} />}
        ListEmptyComponent={<NoData />}
      />
      {total > 0 && (
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: deviceWidth,
            height: 50 + insets.safeBottom + 10,
            paddingBottom: 20,
            paddingHorizontal: 20,
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.color1,
          }}
        >
          <View style={{ width: "50%" }}>
            <Text style={globalStyles.textStyle(20, "500")}>₹{total}</Text>
          </View>
          <TouchableOpacity
            style={{
              height: 50,
              backgroundColor: colors.primary,
              width: deviceWidth * 0.4,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              borderColor: colors.primary,
              borderWidth: 1,
            }}
            activeOpacity={0.7}
            onPress={onPlaceOrder}
          >
            <Text style={globalStyles.textStyle(20, "500", colors.color1)}>
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
