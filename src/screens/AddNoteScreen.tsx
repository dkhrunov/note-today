import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
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
      <ScrollView style={{ flex: 1 }}>
        <Input
          label='Note title'
          placeholder='Create a name for the note'
          containerStyle={styles.inputContainer}
          labelStyle={styles.inputLabel}
          inputStyle={styles.inputText}
          onChangeText={onChangeTitle}
        />

        <Input
          label='Note text'
          placeholder='What would you like to do?'
          containerStyle={styles.inputContainer}
          labelStyle={styles.inputLabel}
          inputStyle={styles.inputText}
          onChangeText={onChangeText}
          multiline={true}
          blurOnSubmit={true}
        />

        <View style={{ marginBottom: 20 }}>
          <ModalPicker2
            label='Note importance'
            data={NOTE_IMPORTANCES}
            modalHeader='Select importance'
            onSelect={value => setImportance(value as NoteImportance)}
            modalStyles={{ width: '70%', height: '40%' }}
          />
        </View>
      </ScrollView>

      <View style={styles.buttonPanel}>
        <RoundedButton
          text='Create'
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
    backgroundColor: ThemeColors.white,
    padding: 10,
  },
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
  buttonPanel: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 10,
  },
});

type AddNoteScreenProps = {
  navigation: any,
};

export default AddNoteScreen;
