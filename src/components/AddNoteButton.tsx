import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import ThemeColors from "../shared/themeColors";

const AddNoteButton = (props) => {
  const { navigation } = props;

  const onClick = () => navigation.navigate("AddNote");

  return (
    <TouchableOpacity onPress={onClick} style={styles.container}>
      <View style={styles.button}>
        <Text style={styles.text}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: ThemeColors.white,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    padding: 5,
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: ThemeColors.purple,
    shadowColor: "#000000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { height: 0, width: 0 },
    elevation: 5,
  },
  text: {
    color: ThemeColors.white,
    fontSize: 25,
  },
});

export default AddNoteButton;
