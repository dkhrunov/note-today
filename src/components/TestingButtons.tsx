import React from 'react';
import { StyleSheet, View } from 'react-native';
import ThemeColors from '../shared/ThemeColors';
import Store from '../services/Store';
import RoundedButton from '../components/RoundedButton';

const TestingButtons = ({ refreshNotes }: TestingButtonsProps) => {

  const clearAll = async () => {
    await Store.removeAll();
    await refreshNotes();
  };

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
