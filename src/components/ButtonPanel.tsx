import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import ThemeColors from '../shared/ThemeColors';

/**
 * Космитическая обертка - панель с кнопками.
 * Кнопки которые передаются как дочерние элементы.
 * @param children - дочерние компонента, обернутые в эту панель. 
 */
const ButtonPanel = ({ style, children }: ButtonPanelProps) => (
  <View style={[styles.container, style]}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: 'transparent',
    // backgroundColor: ThemeColors.lightGrey,
    // borderTopColor: '#d4d4d4',
    // borderTopWidth: 1,
    padding: 10,
  },
});

interface ButtonPanelProps {
  style: ViewStyle,
  children: React.ReactNode;
}

export default ButtonPanel;
