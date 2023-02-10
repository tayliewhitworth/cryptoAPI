import React, { useMemo, useRef, useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, SafeAreaView } from "react-native";
import ListItem from "./components/ListItem";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { SAMPLE_DATA } from "./assets/data/sampleData";
import Chart from "./components/Chart";
import { getMarketData } from "./services/cryptoService";

const ListHeader = () => (
  <>
    <View style={styles.titleWrapper}>
      <Text style={styles.largeTitle}>Markets</Text>
    </View>
    <View style={styles.divider}></View>
  </>
);

export default function App() {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData()
      setData(marketData)
    }

    fetchMarketData()
  }, [])
  

  const bottomSheetModalRef = useRef(null);

  const snapPoints = useMemo(() => ["45%"], []);

  const openModal = (item) => {
    setSelectedCoin(item);
    bottomSheetModalRef.current.present();
  };

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          renderItem={({ item }) => (
            <ListItem
              name={item.name}
              symbol={item.symbol}
              currentPrice={item.current_price}
              priceChange={item.price_change_percentage_7d_in_currency}
              logoUrl={item.image}
              onPress={() => openModal(item)}
            />
          )}
          ListHeaderComponent={<ListHeader />}
        />
      </SafeAreaView>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
      >
        { selectedCoin ? (
          <Chart
            currentPrice={selectedCoin.current_price}
            logoUrl={selectedCoin.image}
            name={selectedCoin.name}
            symbol={selectedCoin.symbol}
            priceChange={selectedCoin.price_change_percentage_7d_in_currency}
            sparkline={selectedCoin.sparkline_in_7d.price}
          />
        ) : null}
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleWrapper: {
    marginTop: 30,
    paddingHorizontal: 16,
  },
  largeTitle: {
    fontWeight: "bold",
    fontSize: 24,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#A9ABB1",
    marginHorizontal: 16,
    marginTop: 16,
  },
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
