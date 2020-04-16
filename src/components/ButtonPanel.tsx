import React from 'react';
import { View, StyleSheet } from 'react-native';
import ThemeColors from '../shared/ThemeColors';

/**
 * Космитическая обертка - панель с кнопками.
 * Кнопки которые передаются как дочерние элементы.
 * @param children - дочерние компонента, обернутые в эту панель. 
 */
const ButtonPanel = ({ children }: ButtonPanelProps) => (
  <View style={styles.container}>
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    backgroundColor: ThemeColors.lightGrey,
    borderTopWidth: 1,
    borderTopColor: '#d4d4d4',
    padding: 10,
  },
});

interface ButtonPanelProps {
  children: React.ReactNode;
}

export default ButtonPanel;
