import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedRef,
  useScrollViewOffset,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { AnimatedImage, Header, LoginAlertModal } from "../../components";
import { deviceHeight, deviceWidth, insets } from "../../config";
import { colors } from "../../config/colors";
import { globalStyles } from "../../config/styles";
import { setCart } from "../../redux/slice";

export default function Detail({ route }) {
  const item = route.params;
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const scrollRef = useAnimatedRef();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    if (!route.params) {
      navigation.goBack();
    }
  }, []);

  useEffect(() => {
    if (cart.length) {
      const found = cart.find((i) => i.id === item.id);
      setInCart(found ? true : false);
    }
  }, [cart]);

  const onCartAction = () => {
    if (user?.id) {
      if (inCart) {
        navigation.navigate("Cart");
      } else {
        dispatch(setCart([...cart, item]));
      }
    } else {
      setIsLoginModalVisible(true);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <Header scrollOffset={scrollOffset} />
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        <View>
          <AnimatedImage uri={item.image} scrollOffset={scrollOffset} />
          <View
            style={{
              paddingTop: 25,
              backgroundColor: "white",
              paddingHorizontal: 20,
              paddingBottom: deviceHeight * 0.4,
            }}
          >
            <Text style={globalStyles.textStyle(40, "700", colors.color5)}>
              {item.title}
            </Text>
            <View style={{ marginTop: 10 }} />
            <Text style={globalStyles.textStyle(40, "500", colors.primary)}>
              ₹{item.price}
            </Text>
            <View style={{ marginTop: 20 }} />
            <Text style={globalStyles.textStyle(20, "400", colors.color4)}>
              {item?.description}
            </Text>
          </View>
        </View>
      </Animated.ScrollView>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: deviceWidth,
          height: 50 + insets.safeBottom + 10,
          paddingTop: 10,
        }}
      >
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: inCart ? colors.color1 : colors.primary,
            width: deviceWidth * 0.7,
            alignSelf: "center",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            borderColor: colors.primary,
            borderWidth: 1,
          }}
          activeOpacity={0.7}
          onPress={onCartAction}
        >
          <Text
            style={globalStyles.textStyle(
              20,
              "500",
              inCart ? colors.primary : colors.color1
            )}
          >
            {inCart ? "View Cart" : "Add To Cart"}
          </Text>
        </TouchableOpacity>
      </View>
      <LoginAlertModal
        visible={isLoginModalVisible}
        onClose={() => setIsLoginModalVisible(false)}
      />
    </View>
  );
}
