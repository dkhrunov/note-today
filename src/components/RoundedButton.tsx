import React from 'react';
import { View, StyleSheet, Button, ViewStyle } from 'react-native';
import ThemeColors from '../shared/ThemeColors';

const RoundedButton = ({ type, text, onPress, buttonStyle, disabled }: RoundedButtonProps) => {

  return (
    <View style={[styles.button, styles[type], disabled ? styles.disabled : null, buttonStyle]}>
      <Button
        title={text}
        color={ThemeColors.white}
        onPress={onPress}
        disabled={disabled}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: ThemeColors.black,
    color: ThemeColors.white,
    borderRadius: 20,
    minWidth: 100,
    margin: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
  },
  disabled: {
    opacity: 0.7,
  },
  info: {
    backgroundColor: ThemeColors.blue,
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
  onPress(): any,
  buttonStyle?: ViewStyle,
  disabled?: boolean,
};

export type ButtonType = 'info' | 'success' | 'error';

export default RoundedButton;
