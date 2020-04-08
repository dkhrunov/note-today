import React from "react";
import { View, StyleSheet, Button } from "react-native";
import ThemeColors from "../shared/ThemeColors";

const RoundedButton = (props) => {
  const type: ButtonType = props.type;
  const text: string = props.text;
  const onClick = props.onClick;

  return (
    <View style={[styles.button, styles[type]]}>
      <Button onPress={onClick} title={text} color={ThemeColors.white} />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: ThemeColors.black,
    color: ThemeColors.white,
    borderRadius: 15,
    width: 100,
    margin: 10,
  },
  info: {
    backgroundColor: ThemeColors.purple,
  },
  success: {
    backgroundColor: ThemeColors.green,
  },
  error: {
    backgroundColor: ThemeColors.red,
  },
});

export default RoundedButton;

export type ButtonType = "info" | "success" | "error";
