import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Input } from 'react-native-elements';
import { Note, NoteImportance, NOTE_IMPORTANCES } from '../models/Note.model';
import Store from '../services/Store';
import ThemeColors from '../shared/ThemeColors';
import ModalPicker2 from '../components/ModalPicker2';
import RoundedButton from '../components/RoundedButton';

const AddNoteScreen = ({ navigation }: AddNoteScreenProps) => {
  const [title, setTitle] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [importance, setImportance] = useState<NoteImportance>('primary');

  const onSaveNote = async () => {
    const note: Note = {
      text,
      title,
      importance,
      id: Date.now().toString(),
      done: false,
    };

    await Store.add(note);
    navigation.goBack();
  };

  // TODO валидация
  const onChangeTitle = (value: string) => setTitle(value);
  const onChangeText = (value: string) => setText(value);

  return (
    <View style={styles.container}>
      <Input
        label='Note title'
        placeholder='Create a name for the note'
        containerStyle={styles.inputContainer}
        labelStyle={styles.inputLabel}
        onChangeText={onChangeTitle}
      />

      <Input
        label='Note text'
        placeholder='What would you like to do?'
        containerStyle={styles.inputContainer}
        labelStyle={styles.inputLabel}
        multiline={true}
        onChangeText={onChangeText}
      />

      <View>
        <ModalPicker2
          label='Note importance'
          data={NOTE_IMPORTANCES}
          modalHeader='Select importance'
          onSelect={value => setImportance(value as NoteImportance)}
          modalStyles={{ width: '70%', height: '40%' }}
        />
      </View>

      <View style={{ width: '100%', justifyContent: 'center', flexDirection: 'row' }}>
        <RoundedButton
          text='Save'
          type='info'
          onPress={onSaveNote}
          buttonStyle={{ width: '50%' }}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    marginBottom: 20,
    maxHeight: 180,
  },
  inputLabel: {
    fontSize: 20,
    color: ThemeColors.black,
  },
  importanceText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: ThemeColors.black,
    marginBottom: 8,
    marginLeft: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

type AddNoteScreenProps = {
  navigation: any,
};

export default AddNoteScreen;
