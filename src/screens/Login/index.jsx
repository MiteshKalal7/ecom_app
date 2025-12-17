import { CommonActions, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";
import { deviceWidth, showToast, validateEmail } from "../../config";
import { colors } from "../../config/colors";
import { globalStyles } from "../../config/styles";
import { setToken, setUser } from "../../redux/slice";
import { credentials } from "./cred";

export default function Login() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("test@zignuts.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const onLogin = async () => {
    if (!email) {
      showToast("Please enter your email.");
    } else if (!password) {
      showToast("Please enter your password.");
    } else if (!validateEmail(email)) {
      showToast("Please enter valid email.");
    } else {
      setLoading(true);
      await sleep(1000);

      const found = credentials.find((item) => item.email === email);
      setLoading(false);
      if (found) {
        if (found.password === password) {
          dispatch(setUser(found));
          dispatch(setToken("TEST_TOKEN"));
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{ name: "ProductList" }],
            })
          );
          showToast("Login successful!");
        } else {
          showToast("Something went wrong. Please try again.");
        }
      } else {
        showToast("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={{
        backgroundColor: colors.color1,
        paddingHorizontal: 25,
      }}
      contentContainerStyle={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("./../../assets/images/logo_full.png")}
          style={{
            height: 70,
            resizeMode: "contain",
          }}
        />

        <View style={{ marginTop: 40 }}>
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
          <View style={{ marginTop: 20 }} />
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter your password"
            secureTextEntry
            autoCapitalize="none"
            value={password}
            onChangeText={(value) => setPassword(value)}
          />
        </View>
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: colors.primary,
            width: deviceWidth - 50,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 20,
            opacity: loading ? 0.7 : 1,
          }}
          onPress={onLogin}
          activeOpacity={0.7}
          disabled={loading}
        >
          <Text style={globalStyles.textStyle(18, "600", colors.color1)}>
            {loading ? "Please wait..." : "Login"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  inputStyle: {
    height: 50,
    borderColor: colors.color2,
    borderWidth: 1,
    borderRadius: 20,
    width: deviceWidth - 50,
    paddingLeft: 15,
    ...globalStyles.textStyle(16, "400", colors.color3),
  },
});
