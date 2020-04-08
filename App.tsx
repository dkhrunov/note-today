import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import NoteScreen from "./src/screens/NoteScreen";
import AddNoteScreen from "./src/screens/AddNoteScreen";
import ThemeColors from "./src/shared/themeColors";

const ThemeNavigation = {
  headerStyle: {
    backgroundColor: ThemeColors.purple,
    shadowOpacity: 0,
  },
  headerTintColor: ThemeColors.white,
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "All Notes",
            ...ThemeNavigation,
          }}
        />
        <Stack.Screen
          name="Note"
          component={NoteScreen}
          options={{
            title: "Note",
            ...ThemeNavigation,
          }}
        />
        <Stack.Screen
          name="AddNote"
          component={AddNoteScreen}
          options={{
            title: "New Note",
            ...ThemeNavigation,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
