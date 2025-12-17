import { CommonActions, useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity, View } from "react-native";
import { colors } from "../config/colors";
import { globalStyles } from "../config/styles";

export default function NoData() {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 1,
        routes: [{ name: "ProductList" }],
      })
    );
  };

  return (
    <View
      style={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={globalStyles.textStyle(27, "600")}>Oops!</Text>
      <View style={{ marginTop: 10 }} />
      <Text style={globalStyles.textStyle(17, "400")}>
        Nothing to show here :(
      </Text>
      <TouchableOpacity
        style={{
          height: 40,
          backgroundColor: colors.primary,
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          borderColor: colors.primary,
          borderWidth: 1,
          paddingHorizontal: 15,
          marginTop: 30,
        }}
        onPress={goToHome}
      >
        <Text style={globalStyles.textStyle(15, "600", colors.color1)}>
          Go to home
        </Text>
      </TouchableOpacity>
    </View>
  );
}
