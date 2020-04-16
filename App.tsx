import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import NoteScreen from './src/screens/NoteScreen';
import AddNoteScreen from './src/screens/AddNoteScreen';
import ThemeColors from './src/shared/ThemeColors';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={HomeScreen}
          options={{
            title: 'Note Today',
            ...ThemeNavigation,
          }}
        />
        <Stack.Screen
          name='Note'
          component={NoteScreen}
          options={{
            title: 'Browse Note',
            ...ThemeNavigation,
          }}
        />
        <Stack.Screen
          name='AddNote'
          component={AddNoteScreen}
          options={{
            title: 'New Note',
            ...ThemeNavigation,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const ThemeNavigation = {
  headerStyle: {
    backgroundColor: ThemeColors.blue,
    shadowOpacity: 0,
  },
  headerTintColor: ThemeColors.white,
};
