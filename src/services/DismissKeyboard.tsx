import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Keyboard } from 'react-native';

/**
 * Так-с, это у нас тут хок, который скрывает клавиатуру
 * при клике в любую другую область экрана.
 * @param children - компонент, который будет обернут в доп логику.
 */
const DismissKeyboard = ({ children }: DismissKeyboardProps) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={styles.container}>
    {children}
  </TouchableWithoutFeedback>
);

const styles = {
  container: { height: '100%', width: '100%' },
}

type DismissKeyboardProps = {
  children: any,
};

export default DismissKeyboard;
