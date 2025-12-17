import { Image, View } from "react-native";
import { deviceWidth } from "../../config";
import { colors } from "../../config/colors";

export default function Loader() {
  const size = deviceWidth / 2 - 30;
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingBottom: 20,
      }}
    >
      {new Array(10).fill(null).map((_, i) => {
        return (
          <View
            key={i}
            style={{
              width: size,
              marginBottom: 30,
            }}
          >
            <Image
              style={{
                height: size,
                aspectRatio: 1,
                backgroundColor: colors.color2,
                borderRadius: 20,
                marginBottom: 10,
                resizeMode: "contain",
              }}
            />
            <View
              style={{
                height: 17,
                width: "90%",
                backgroundColor: colors.color2,
                borderRadius: 5,
                marginBottom: 5,
              }}
            />
            <View
              style={{
                height: 17,
                width: "50%",
                backgroundColor: colors.color2,
                borderRadius: 5,
              }}
            />
          </View>
        );
      })}
    </View>
  );
}
