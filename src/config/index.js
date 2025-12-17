import moment from "moment";
import { createRef } from "react";
import { Dimensions, Platform } from "react-native";
import StaticSafeAreaInsets from "react-native-static-safe-area-insets";

export const deviceWidth = Dimensions.get("window").width;
export const deviceHeight = Dimensions.get("window").height;

export const fonts = {
  primary: "Montserrat",
};

export const toastRef = createRef();

export const HEADER_HEIGHT = 50;

export const insets = {
  top: StaticSafeAreaInsets.safeAreaInsetsTop,
  bottom: StaticSafeAreaInsets.safeAreaInsetsBottom,
  safeBottom:
    StaticSafeAreaInsets.safeAreaInsetsBottom > 0
      ? StaticSafeAreaInsets.safeAreaInsetsBottom
      : 10,
};

export const showToast = (text) => {
  if (text === "Network request failed") {
    toastRef.current?.show("Please check your connection.");
  } else {
    toastRef.current?.show(
      typeof text === "string"
        ? text
        : text
        ? JSON.stringify(text)
        : "Failed..."
    );
  }
};

export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

export const formateDate = (date) => {
  return moment(Number(date)).format("DD MMM YYYY, hh:mm:ss A");
};
