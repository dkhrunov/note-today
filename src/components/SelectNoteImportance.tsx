import React from 'react';
import ModalPicker2 from './ModalPicker2';
import { NOTE_IMPORTANCES, NoteImportance } from '../models/Note.model';
import { StyleSheet } from 'react-native';

/**
 * Presentational компонент, отражающий select поле,
 * с модальном окном для выбора важности заметки.
 */
const SelectNoteImportance = (props: SelectNoteImportanceProps) => (
  <ModalPicker2
    label='Note importance'
    modalHeader='Select importance'
    data={NOTE_IMPORTANCES}
    badge={{ status: props.value }}
    onSelect={value => props.onChange(value as NoteImportance)}
    modalStyles={styles.modal}
  />
);

const styles = StyleSheet.create({
  modal: {
    width: '70%',
    height: '40%',
  },
});

type SelectNoteImportanceProps = {
  value: NoteImportance,
  onChange(value: NoteImportance): any,
};

export default SelectNoteImportance;
