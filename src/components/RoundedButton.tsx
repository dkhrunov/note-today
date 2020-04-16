import React from 'react';
import { View, StyleSheet, Text, ViewStyle, TouchableOpacity } from 'react-native';
import ThemeColors from '../shared/ThemeColors';

/**
 * Кнопка с загругленными краями.
 * @param props - свойства кнопки.
 */
const RoundedButton = ({ type, text, onPress, buttonStyle, disabled }: RoundedButtonProps) => {

  return (
    <View style={[styles.button, styles[type], disabled ? styles.disabled : null, buttonStyle]}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: ThemeColors.black,
    color: ThemeColors.white,
    borderRadius: 20,
    minWidth: 100,
    height: 40,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 2,
    paddingBottom: 2,
    justifyContent: 'center',
    alignContent: 'center',
  },
  disabled: {
    opacity: 0.7,
  },
  text: {
    textAlign: 'center',
    color: ThemeColors.white,
    fontSize: 18,
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
