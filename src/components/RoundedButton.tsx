import React, { ReactNode } from 'react';
import { View, StyleSheet, Text, ViewStyle, TouchableOpacity } from 'react-native';
import ThemeColors from '../shared/ThemeColors';

/**
 * Кнопка с загругленными краями.
 * @param props - свойства кнопки.
 */
const RoundedButton = ({
  type,
  text,
  onPress,
  buttonStyle,
  disabled,
  children,
}: RoundedButtonProps) => (
    <TouchableOpacity onPress={onPress} style={styles.content}>
      <View style={[styles.button, styles[type], disabled ? styles.disabled : null, buttonStyle]}>
        {children}
        {text ? <Text style={styles.text}>{text}</Text> : null}
      </View>
    </TouchableOpacity>
  );

const styles = StyleSheet.create({
  content: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  button: {
    backgroundColor: ThemeColors.black,
    color: ThemeColors.white,
    borderRadius: 20,
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
    marginLeft: 10,
    marginRight: 10,
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
  onPress(): any,
  text?: string,
  buttonStyle?: ViewStyle,
  disabled?: boolean,
  children?: React.ReactNode,
};

export type ButtonType = 'info' | 'success' | 'error';

export default RoundedButton;
