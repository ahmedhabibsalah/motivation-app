import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./compoents/Home";
import Main from "./compoents/Main";
import QuotesScreen from "./compoents/QuotesScreen";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerMode: "screen",
          headerTintColor: "white",
          headerStyle: { backgroundColor: "#134644" },
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen
          name="Main"
          options={{
            title: "Pop The Balloons",
          }}
          component={Main}
        />
        <Stack.Screen
          name="Quotes"
          options={{
            title: "Your Quotes",
          }}
          component={QuotesScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
