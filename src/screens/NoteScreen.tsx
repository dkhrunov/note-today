import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import RoundedButton from '../components/RoundedButton';
import ThemeColors from '../shared/ThemeColors';
import { Note, NOTE_IMPORTANCES, NoteImportance } from '../models/Note.model';
import Store from '../services/Store';
import { Input } from 'react-native-elements';
import ModalPicker2 from '../components/ModalPicker2';

const NoteScreen = ({ navigation, route }: NoteScreenProps) => {
  const note: Note = route.params;
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const [importance, setImportance] = useState<NoteImportance>(note.importance);

  const onUpdate = async () => {
    const updatedNote = { ...note, text, title, importance };
    await Store.update(updatedNote.id, updatedNote);
    navigation.goBack();
  };

  const onDelete = async () => {
    await Store.remove(note.id);
    navigation.goBack();
  };

  const onChangeTitle = (value: string) => setTitle(value);
  const onChangeText = (value: string) => setText(value);

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <Input
          label='Note title'
          value={title}
          containerStyle={styles.inputContainer}
          labelStyle={styles.inputLabel}
          inputStyle={styles.inputText}
          onChangeText={onChangeTitle}
        />

        <Input
          label='Note text'
          value={text}
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
            initialValue={importance}
            modalHeader='Select importance'
            onSelect={value => setImportance(value as NoteImportance)}
            modalStyles={{ width: '70%', height: '40%' }}
          />
        </View>
      </ScrollView>

      <View style={styles.buttonPanel}>
        <RoundedButton
          type='info'
          text='Save'
          onPress={onUpdate}
          buttonStyle={{ width: '45%' }}
        />

        <RoundedButton
          type='error'
          text='Delete'
          onPress={onDelete}
          buttonStyle={{ width: '45%' }}
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    paddingTop: 10,
  },
});

type NoteScreenProps = {
  navigation: any,
  route: any,
};

export default NoteScreen;
