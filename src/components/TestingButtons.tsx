import React from 'react';
import { StyleSheet, View } from 'react-native';
import ThemeColors from '../shared/ThemeColors';
import Store from '../services/Store';
import RoundedButton from '../components/RoundedButton';

/**
 * Ну а это компонент для ленивых,
 * если тебе лень создавать самому 10 тестовых заметок
 * или очистить экран от заметок, ТО ТЕБЕ СЮДА!!!! Велком!
 */
const TestingButtons = ({ refreshNotes }: TestingButtonsProps) => {

  /**
   * Очищает хранилище от заметок.
   */
  const clearAll = async () => {
    await Store.removeAll();
    await refreshNotes();
  };

  /**
   * Создает 10 тестовых заметок в хранилище.
   */
  const makeTestNotes = async () => {
    await Store.addTenNotes();
    refreshNotes();
  };

  return (
    <View style={styles.testingButtons}>
      <RoundedButton
        text='Add 10 notes'
        type='info'
        onPress={makeTestNotes}
      />
      <RoundedButton
        text='Clear all'
        type='error'
        onPress={clearAll}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  testingButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: ThemeColors.white,
    padding: 10,
  },
});

type TestingButtonsProps = {
  refreshNotes(): any,
};

export default TestingButtons;
