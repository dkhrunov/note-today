import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import ThemeColors from '../shared/ThemeColors';

const RoundedButton = ({ type, text, onPress }: RoundedButtonProps) => {

  return (
    <View style={[styles.button, styles[type]]}>
      <Button onPress={onPress} title={text} color={ThemeColors.white} />
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

type RoundedButtonProps = {
  type: ButtonType,
  text: string,
  onPress: () => {},
};

export type ButtonType = 'info' | 'success' | 'error';

export default RoundedButton;
