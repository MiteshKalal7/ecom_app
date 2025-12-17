import { useNavigation } from "@react-navigation/native";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { deviceWidth } from "../config";
import { colors } from "../config/colors";
import { globalStyles } from "../config/styles";

export default function LoginAlertModal({ visible, onClose }) {
  const navigation = useNavigation();
  const onAction = () => {
    navigation.navigate("Login");
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.color9,
        }}
      >
        <View
          style={{
            backgroundColor: colors.color1,
            borderRadius: 35,
            paddingTop: 35,
            paddingBottom: 25,
            width: deviceWidth * 0.8,
            paddingHorizontal: 20,
            alignItems: "center",
          }}
        >
          <Text style={globalStyles.textStyle(17, "600")}>
            You need to login to continue
          </Text>
          <View style={{ marginTop: 20 }}>
            <TouchableOpacity
              style={{
                height: 50,
                backgroundColor: colors.secondary,
                width: deviceWidth * 0.7,
                alignSelf: "center",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={onAction}
            >
              <Text style={globalStyles.textStyle(20, "500", colors.primary)}>
                Login
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 15 }} onPress={onClose}>
              <Text
                style={[
                  globalStyles.textStyle(
                    15,
                    "400",
                    colors.color8,
                    null,
                    "center"
                  ),
                  {
                    textDecorationLine: "underline",
                  },
                ]}
              >
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
