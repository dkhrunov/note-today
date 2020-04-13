import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Keyboard } from 'react-native';

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
