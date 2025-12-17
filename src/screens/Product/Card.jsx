import { useNavigation } from "@react-navigation/native";
import { Text, TouchableOpacity } from "react-native";
import { CustomImage } from "../../components";
import { deviceWidth } from "../../config";
import { colors } from "../../config/colors";
import { globalStyles } from "../../config/styles";

export default function Card({ item }) {
  const navigation = useNavigation();

  const size = deviceWidth / 2 - 30;
  return (
    <TouchableOpacity
      style={{
        width: size,
        paddingBottom: 30,
      }}
      activeOpacity={0.6}
      onPress={() => {
        navigation.navigate("ProductDetail", item);
      }}
    >
      <CustomImage
        uri={item.image}
        style={{
          height: size,
          aspectRatio: 1,
          borderRadius: 20,
          marginBottom: 10,
          resizeMode: "contain",
        }}
      />
      <Text
        style={globalStyles.textStyle(17, "600", colors.color3, 25)}
        numberOfLines={1}
      >
        {item?.title}
      </Text>
      <Text style={globalStyles.textStyle(17, "400", colors.color4)}>
        ₹{item?.price ?? 0}
      </Text>
    </TouchableOpacity>
  );
}
