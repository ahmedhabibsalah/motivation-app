import React, { useRef, useState, useEffect } from "react";
import {
  Animated,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import data from "../data/data.json";

export default function Main({ navigation }) {
  const [poppedBalloons, setPoppedBalloons] = useState({});
  const [selectedObject, setSelectedObject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [allPopped, setAllPopped] = useState(false);
  const opacity = useRef(new Animated.Value(1)).current;
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    // Check if all balloons are popped and update button visibility
    const allPopped = Object.keys(poppedBalloons).length === 9;
    setAllPopped(allPopped);
  }, [poppedBalloons]);

  const handlePress = async (index) => {
    if (!poppedBalloons[index]) {
      const randomIndex = Math.floor(Math.random() * data.length);
      const randomObject = data[randomIndex];

      setPoppedBalloons((prevState) => ({
        ...prevState,
        [index]: true,
      }));

      setSelectedObject(randomObject);
      setShowModal(true);

      // Add an `id` if not present in the object
      const savedQuotes =
        JSON.parse(await AsyncStorage.getItem("selectedQuotes")) || [];
      if (
        randomObject &&
        !savedQuotes.some((quote) => quote.id === randomObject.id)
      ) {
        // Generate a unique ID if necessary
        const quoteWithId = { ...randomObject, id: Date.now() };
        savedQuotes.push(quoteWithId);
        await AsyncStorage.setItem(
          "selectedQuotes",
          JSON.stringify(savedQuotes)
        );
      }
    }
  };

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
  }, [poppedBalloons, showModal]);
  const handleReset = () => {
    setPoppedBalloons({});
    // No changes to AsyncStorage as quotes should be retained
  };

  const handleNavigate = () => {
    navigation.navigate("Quotes");
  };

  const renderItem = ({ item, index }) => (
    <TouchableWithoutFeedback onPress={() => handlePress(index)}>
      <View style={styles.imageContainer}>
        <Animated.View style={{ ...styles.imageWrapper, opacity }}>
          {poppedBalloons[index] ? (
            <Image
              source={require("../assets/poped.jpeg")}
              style={styles.image}
            />
          ) : (
            <Image
              source={require("../assets/balloon.jpeg")}
              style={styles.image}
            />
          )}
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data.slice(0, 9)} // Display only the first 9 items
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
      {showModal && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => {
            setShowModal(!showModal);
          }}>
          <View style={styles.centeredView}>
            <View
              style={
                selectedObject?.author != "Nourhan Sharkas"
                  ? [styles.modalView, styles.normalModal]
                  : [styles.modalView, styles.spcialModal]
              }>
              <Text
                style={
                  selectedObject?.author != "Nourhan Sharkas"
                    ? styles.modalText
                    : styles.modalSpecialText
                }>
                {selectedObject?.quote}
              </Text>
              <Text
                style={
                  selectedObject?.author != "Nourhan Sharkas"
                    ? styles.authorText
                    : styles.authorSpecialText
                }>
                - {selectedObject?.author}
                {selectedObject?.author == "Nourhan Sharkas" ? "🌼" : null}
              </Text>
              {/* Added author field */}
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setShowModal(!showModal)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
      <View style={styles.buttonsContainer}>
        {allPopped && (
          <Pressable
            style={[styles.button, styles.buttonReset]}
            onPress={handleReset}>
            <Text style={styles.textStyle}>Reset</Text>
          </Pressable>
        )}
        {quotes?.length > 0 && (
          <Pressable
            style={[styles.button, styles.buttonNavigate]}
            onPress={handleNavigate}>
            <Text style={styles.textStyle}>Navigate to Your Quotes</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#134644",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  grid: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 1,
    margin: 5,
  },
  imageWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  normalModal: {
    backgroundColor: "white",
  },
  spcialModal: {
    backgroundColor: "purple",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 3,
  },
  buttonClose: {
    backgroundColor: "#134644",
  },
  buttonReset: {
    backgroundColor: "#F194FF",
  },
  buttonNavigate: {
    backgroundColor: "#4CAF50",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  authorText: {
    marginTop: 5,
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
  },
  authorSpecialText: {
    marginTop: 5,
    fontSize: 16,
    color: "#dedede",
    marginBottom: 15,
  },
  modalText: {
    textAlign: "center",
    color: "black",
  },
  modalSpecialText: {
    textAlign: "center",
    color: "white",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    margin: 40,
  },
});
