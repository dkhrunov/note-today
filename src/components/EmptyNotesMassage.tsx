import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import ThemeColors from '../shared/ThemeColors';

const EmptyNotesMessage = () => (
  <View style={styles.emptyMessageContoiner}>
    <Text h1 style={styles.emptyMessageText}>Oops!</Text>
    <Text h3 style={styles.emptyMessageText}>You don't have Notes</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  emptyMessageContoiner: {
    flex: 5,
    justifyContent: 'center',
    alignContent: 'center',
  },
  emptyMessageText: {
    textAlign: 'center',
    color: ThemeColors.grey,
  },
});

export default EmptyNotesMessage;
