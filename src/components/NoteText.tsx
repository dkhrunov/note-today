import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import ThemeColors from '../shared/ThemeColors';

const NoteText = (props: NoteTextProps) => (
  <Input
    label='Note text'
    placeholder='What would you like to do?'
    value={props.value}
    onChangeText={value => props.onChange(value)}
    containerStyle={styles.inputContainer}
    labelStyle={styles.inputLabel}
    inputStyle={styles.inputText}
    multiline={true}
    blurOnSubmit={true}
  />
);

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 18,
    color: ThemeColors.black,
  },
  inputText: {
    fontSize: 15,
  },
});

type NoteTextProps = {
  value: string,
  onChange(value: string): any,
};

export default NoteText;
