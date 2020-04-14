import React, { useState } from 'react';
import { CheckBox } from 'react-native-elements';
import { Note } from '../models/Note.model';
import { StyleSheet } from 'react-native';
import Store from '../services/Store';
import ThemeColors from '../shared/ThemeColors';

const NoteCheckbox = ({ note }: NoteCheckboxProps) => {
  const [status, setStatus] = useState<boolean>(note.done);

  const onPress = async () => {
    const updatedNote: Note = {
      ...note,
      done: !note.done,
    };

    await Store.update(note.id, updatedNote);
    setStatus(!status);
  };

  return (
    <CheckBox
      checked={status}
      onPress={onPress}
      checkedColor={ThemeColors.blue}
      containerStyle={styles.checkBox}
    />
  );
};

const styles = StyleSheet.create({
  checkBox: {
    margin: 0,
    padding: 0,
  },
});

type NoteCheckboxProps = {
  note: Note,
};

export default NoteCheckbox;
