import React from "react";
import {
  Button,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/cartoon_balloons_dark_theme.jpg")}
        style={styles.image}
        resizeMode="cover">
        <Text style={styles.text}>Pop Famous Motivational Quotes</Text>
        <Text style={styles.subtext}>Over 50 Different Quotes</Text>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.9}
          onPress={() => {
            navigation.navigate("Main");
          }}>
          <Text style={styles.buttonText}>Start Poping 🎈</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    lineHeight: 48,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  subtext: {
    color: "white",
    fontSize: 12,
    lineHeight: 24,
    fontWeight: "normal",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  button: {
    backgroundColor: "#4CAF50", // Custom background color
    padding: 10,
    borderRadius: 10, // Rounded corners
    alignItems: "center",
    width: "80%",
    alignSelf: "center",
    opacity: 1,
    marginTop: 4,
  },
  buttonText: {
    color: "#fff", // Text color
    fontSize: 18, // Text size
  },
});
