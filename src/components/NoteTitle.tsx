import React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import ThemeColors from '../shared/ThemeColors';

const NoteTitle = (props: NoteTitleProps) => (
  <Input
    label='Note title'
    placeholder='Create a name for the note'
    value={props.value}
    onChangeText={value => props.onChange(value)}
    containerStyle={styles.inputContainer}
    labelStyle={styles.inputLabel}
    inputStyle={styles.inputText}
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

type NoteTitleProps = {
  value: string,
  onChange(value: string): any,
};

export default NoteTitle;
