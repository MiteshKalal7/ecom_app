import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { colors } from "../config/colors";
import { globalStyles } from "../config/styles";

export const DURATION = {
  LENGTH_SHORT: 2500,
  FOREVER: 0,
};

const Toast = React.forwardRef((_props, ref) => {
  const { height } = useWindowDimensions();

  const [isShow, setShow] = useState(false);
  const [type, setType] = useState(null);
  const [toastText, setToastText] = useState("");
  const opacityValue = useRef(new Animated.Value(1)).current;
  let animation = null;
  let timer = null;
  let isShowing = false;

  useEffect(() => {
    return () => {
      animation && animation.stop();
      timer && clearTimeout(timer);
    };
  }, [animation, timer]);

  useImperativeHandle(ref, () => ({
    show: (text) => {
      show(text);
    },
  }));

  const show = (text) => {
    setShow(true);
    setToastText(text);
    animation = Animated.timing(opacityValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    });
    animation.start(() => {
      isShowing = true;
      close();
    });
  };

  const close = () => {
    let delay = DURATION.LENGTH_SHORT;

    if (!isShowing && !isShow) {
      return;
    }
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      animation = Animated.timing(opacityValue, {
        toValue: 0.0,
        duration: 500,
        useNativeDriver: true,
      });
      animation.start(() => {
        setShow(false);
        isShowing = false;
      });
    }, delay);
  };

  return (
    <>
      {isShow && (
        <View
          style={[styles.container, { top: height - 120 }]}
          pointerEvents="none"
        >
          <Animated.View
            style={[
              styles.content,
              {
                opacity: opacityValue,
                backgroundColor: colors.color6,
              },
            ]}
          >
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
              }}
            >
              <Text
                style={globalStyles.textStyle(
                  14,
                  "500",
                  colors.color1,
                  null,
                  "center"
                )}
              >
                {toastText}
              </Text>
            </View>
          </Animated.View>
        </View>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    elevation: 999,
    alignItems: "center",
    zIndex: 99999,
  },
  content: {
    borderRadius: 12,
    padding: 10,
    bottom: 64,
    maxWidth: "80%",
    overflow: "hidden",
  },
});

export default Toast;
