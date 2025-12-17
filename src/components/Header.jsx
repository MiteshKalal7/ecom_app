import { useNavigation } from "@react-navigation/native";
import { Image, TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { HEADER_HEIGHT } from "../config";
import { colors } from "../config/colors";
import Back from "./../assets/svgs/back.svg";
import User from "./../assets/svgs/user.svg";

export default function Header({ isMain }) {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user);
  const insets = useSafeAreaInsets();

  const onAccountPress = () => {
    if (user?.id) {
      navigation.navigate("Account");
    } else {
      navigation.navigate("Login");
    }
  };

  return (
    <Animated.View
      style={[
        {
          height: HEADER_HEIGHT + insets.top,
          backgroundColor: colors.color1,
          paddingTop: insets.top,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 25,
        },
      ]}
    >
      {isMain ? (
        <Image
          source={require("./../assets/images/logo_full.png")}
          style={{
            height: 40,
            width: 150,
          }}
        />
      ) : (
        <TouchableOpacity
          style={{
            zIndex: 99,
            padding: 10,
            left: -10,
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Back height="25" width="25" />
        </TouchableOpacity>
      )}
      {isMain && (
        <TouchableOpacity
          style={{
            height: 40,
            aspectRatio: 1,
            backgroundColor: colors.secondary,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={onAccountPress}
        >
          <User height="25" width="25" />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
}
