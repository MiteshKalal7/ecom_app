import { View, Text } from "react-native";
import React from "react";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 50, color: "#ebe7e7ff" }}>Hello</Text>
    </View>
  );
}
