import React, { useState } from 'react';
import { CheckBox } from 'react-native-elements';
import { Note } from '../models/Note.model';
import { StyleSheet } from 'react-native';
import Store from '../services/Store';
import ThemeColors from '../shared/ThemeColors';

/**
 * Чекбокс, отражающий статус выполнения конкретного события.
 * В пропсы принимает объект заметки,
 * для которого этот компонент будет служить служить верой и правдой.
 * @param note - объект заметки.
 */
const NoteCheckbox = ({ note }: NoteCheckboxProps) => {
  /**
   * Состояние чекбокса, берет значение из статуса завершенности заметки.
   */
  const [status, setStatus] = useState<boolean>(note.done);

  /**
   * Обновляет статус заметки локально, в состоянии и в хранилище.
   */
  const onPress = async () => {
    note.done = !note.done;

    const updatedNote: Note = {
      ...note,
      done: note.done,
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
