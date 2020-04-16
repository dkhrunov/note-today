import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ThemeColors from '../shared/ThemeColors';

/**
 * Кнопка, которая при нажатии перемещает на экран для создания новой заметки.
 * @param navigation - содержит различные вспомогательные функции,
 * которые управляют навигацией приложения.
 */
const AddNoteButton = ({ navigation }: AddNoteButtonProps) => {

  /**
   * Перемещает на экран создания заметки
   */
  const onPress = () => navigation.navigate('AddNote');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ThemeColors.white,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    padding: 5,
    height: 50,
    width: 50,
    borderRadius: 100,
    backgroundColor: ThemeColors.blue,
    shadowColor: '#000000',
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

type AddNoteButtonProps = {
  navigation: any,
};

export default AddNoteButton;
