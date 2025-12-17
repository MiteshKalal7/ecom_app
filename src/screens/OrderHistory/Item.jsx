import { Image, Text, View } from "react-native";
import { formateDate } from "../../config";
import { colors } from "../../config/colors";
import { globalStyles } from "../../config/styles";

export default function Item({ order }) {
  return (
    <View
      style={{
        backgroundColor: colors.color1,
        paddingHorizontal: 20,
        paddingTop: 15,
        marginBottom: 20,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View style={{ width: "60%" }}>
          <Text style={globalStyles.textStyle(18, "500", colors.color6)}>
            #{order.orderId}
          </Text>
          <Text style={globalStyles.textStyle(15, "400", colors.color3)}>
            {formateDate(order.createdAt)}
          </Text>
        </View>
        <View style={{ width: "40%", alignItems: "flex-end" }}>
          <Text style={globalStyles.textStyle(20, "600", colors.primary)}>
            ₹{order.total}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: 15 }}>
        {order?.products.map((item, i) => {
          return (
            <View
              key={i}
              style={{
                borderWidth: order.products.length === i + 1 ? 0 : 1,
                borderStyle: "dashed",
                borderColor: colors.color9,
                borderTopWidth: 0,
                borderLeftWidth: 0,
                borderRightWidth: 0,
                paddingVertical: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                }}
              >
                <View style={{ width: "20%" }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: "90%",
                      aspectRatio: 1,
                      resizeMode: "contain",
                    }}
                  />
                </View>
                <View
                  style={{
                    width: "80%",
                  }}
                >
                  <Text
                    style={globalStyles.textStyle(15, "500")}
                    numberOfLines={3}
                  >
                    {item.title}
                  </Text>
                  <Text
                    style={globalStyles.textStyle(
                      17,
                      "500",
                      colors.primary,
                      25
                    )}
                  >
                    ₹{item.price}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
