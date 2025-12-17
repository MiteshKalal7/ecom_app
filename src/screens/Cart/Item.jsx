import { Image, Text, View } from "react-native";
import { colors } from "../../config/colors";
import { globalStyles } from "../../config/styles";

export default function Item({ item }) {
  return (
    <View
      style={{
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: colors.color9,
        borderTopWidth: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        paddingVertical: 20,
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <View style={{ width: "30%" }}>
          <Image
            source={{ uri: item.image }}
            style={{ width: "90%", aspectRatio: 1, resizeMode: "contain" }}
          />
        </View>
        <View
          style={{
            width: "70%",
          }}
        >
          <Text style={globalStyles.textStyle(18, "500")} numberOfLines={3}>
            {item.title}
          </Text>
          <Text style={globalStyles.textStyle(17, "600", colors.primary, 25)}>
            ₹{item.price}
          </Text>
        </View>
      </View>
    </View>
  );
}
