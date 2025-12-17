import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import { Header, NoData } from "../../components";
import { insets } from "../../config";
import Item from "./Item";

export default function OrderHistory() {
  const user = useSelector((state) => state.user);

  const [data, setData] = useState([]);
  const storage = `${user?.id}_order_history`;

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let allData = [];
    const prevOrders = await AsyncStorage.getItem(storage);
    allData = prevOrders ? JSON.parse(prevOrders) : [];

    setData(allData);
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <FlatList
        data={data}
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: 20,
          paddingBottom: insets.safeBottom,
        }}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => <Item order={item} />}
        ListEmptyComponent={<NoData />}
      />
    </View>
  );
}
