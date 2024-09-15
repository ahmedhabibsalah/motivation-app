import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function QuotesScreen() {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const savedQuotes =
          JSON.parse(await AsyncStorage.getItem("selectedQuotes")) || [];
        setQuotes(savedQuotes);
      } catch (error) {
        console.error("Failed to fetch quotes from AsyncStorage:", error);
      }
    };

    fetchQuotes();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.quoteText}>{item.quote || "No quote available"}</Text>
      <Text style={styles.authorText}>{item.author || "Unknown author"}</Text>
    </View>
  );

  const keyExtractor = (item) =>
    item.id ? item.id.toString() : Date.now().toString();

  return (
    <View style={styles.container}>
      <FlatList
        data={quotes}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#134644",
    padding: 10,
  },
  itemContainer: {
    marginBottom: 20,
  },
  quoteText: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 5,
  },
  authorText: {
    color: "#ccc",
    fontSize: 16,
  },
});
