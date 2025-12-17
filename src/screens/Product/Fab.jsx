import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { insets } from "../../config";
import { colors } from "../../config/colors";
import { globalStyles } from "../../config/styles";

export default function Fab() {
  const navigation = useNavigation();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);

  const onCartAction = () => {
    if (user?.id) {
      navigation.navigate("Cart");
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <View
      style={{
        position: "absolute",
        bottom: insets.bottom + 10,
        right: 20,
      }}
    >
      <TouchableOpacity
        style={{
          height: 60,
          aspectRatio: 1,
          backgroundColor: colors.color1,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={onCartAction}
      >
        <View>
          <Image
            source={require("./../../assets/images/logo.png")}
            style={{
              height: 40,
              aspectRatio: 1,
            }}
          />
          {cart?.length > 0 && (
            <View
              style={{
                height: 20,
                aspectRatio: 1,
                borderRadius: 10,
                backgroundColor: colors.primary,
                justifyContent: "center",
                alignItems: "center",
                position: "absolute",
                right: 0,
                top: -5,
              }}
            >
              <Text style={globalStyles.textStyle(12, "400", colors.color1)}>
                {cart.length}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}
