import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { deviceHeight, deviceWidth } from "../config";

export default function AnimatedImage({
  uri,
  scrollOffset,
  IMG_HEIGHT = deviceHeight * 0.5,
}) {
  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    <Animated.Image
      source={{ uri: uri }}
      style={[
        {
          height: IMG_HEIGHT,
          width: deviceWidth,
          borderBottomLeftRadius: 48,
          borderBottomRightRadius: 48,
        },
        imageAnimatedStyle,
      ]}
      resizeMode="contain"
    />
  );
}
