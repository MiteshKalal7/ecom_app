import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Header } from "../../components";
import { deviceHeight } from "../../config";
import { colors } from "../../config/colors";
import { globalStyles } from "../../config/styles";
import { handleLogout } from "../../redux/slice";
import ChevronRight from "./../../assets/svgs/chevron-right.svg";
import Logout from "./../../assets/svgs/logout.svg";
import User from "./../../assets/svgs/user.svg";

export default function Account() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const onLogout = () => {
    Alert.alert("Are you sure?", "Do you want to logout?", [
      { text: "No", onPress: () => {} },
      {
        text: "Yes",
        onPress: async () => {
          const allKeys = await AsyncStorage.getAllKeys();
          const keysToRemove = allKeys.filter(
            (key) => !key.includes("_order_history")
          );
          await AsyncStorage.multiRemove(keysToRemove);
          dispatch(handleLogout());

          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "ProductList" }],
            })
          );
        },
      },
    ]);
  };

  const onActionPress = () => {
    navigation.navigate("OrderHistory");
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Header />
      <ScrollView
        style={{
          flex: 1,
        }}
      >
        <View style={{ marginTop: 50, paddingHorizontal: 20 }}>
          <View
            style={{
              height: deviceHeight / 5,
              aspectRatio: 1,
              backgroundColor: colors.secondary,
              borderRadius: deviceHeight / 5,
              justifyContent: "center",
              alignItems: "center",
              alignSelf: "center",
            }}
          >
            <User height={deviceHeight / 10} />
          </View>
          <View style={{ marginTop: 20, alignSelf: "center" }}>
            <Text style={globalStyles.textStyle(18, "500")}>{user?.email}</Text>
          </View>
          <TouchableOpacity
            style={{
              marginTop: 40,
              height: 50,
              borderColor: colors.color2,
              borderWidth: 1,
              borderRadius: 20,
              alignItems: "center",
              paddingHorizontal: 20,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            onPress={onActionPress}
          >
            <Text style={globalStyles.textStyle(18, "500", colors.color5)}>
              Order History
            </Text>
            <ChevronRight height={"15"} width="15" />
          </TouchableOpacity>
          <View style={{ marginTop: 50 }}>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                backgroundColor: colors.color7,
                height: 40,
                alignSelf: "center",
                paddingHorizontal: 50,
                alignItems: "center",
                borderRadius: 15,
              }}
              onPress={onLogout}
            >
              <Logout
                height="17"
                width="17"
                fill={colors.color8}
                style={{ marginRight: 10 }}
              />
              <Text style={globalStyles.textStyle(17, "400", colors.color8)}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
