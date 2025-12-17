import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Header, NoData } from "../../components";
import { insets } from "../../config";
import { fetchData } from "../../config/service";
import Card from "./Card";
import Fab from "./Fab";
import Loader from "./Loader";

export default function List() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetchData("products").then((res) => {
      setLoading(false);
      setData(res);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Header isMain />
      <FlatList
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
        contentContainerStyle={{
          marginTop: 30,
          paddingBottom: insets.safeBottom + 80,
        }}
        data={data}
        numColumns={2}
        keyExtractor={(item) => item?.id?.toString()}
        ListEmptyComponent={loading ? <Loader /> : <NoData />}
        renderItem={({ item, index }) => {
          return <Card item={item} key={index} />;
        }}
      />
      <Fab />
    </View>
  );
}
