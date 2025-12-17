import { useState } from "react";
import { Image } from "react-native";
import { colors } from "../config/colors";

export default function CustomImage({
  uri,
  style,
  resizeMode = "contain",
  placeholderColor = colors.color2,
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Image
      source={{ uri, resizeMode: resizeMode }}
      style={[
        style,
        {
          backgroundColor: loaded ? "transparent" : placeholderColor,
        },
      ]}
      onLoadEnd={() => setLoaded(true)}
    />
  );
}
