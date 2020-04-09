import React from 'react';
import {
  TextInput,
  View,
  Button,
  InputAccessoryView,
  StyleSheet,
} from 'react-native';
import { Note } from '../models/Note.model';
import Store from '../services/Store';

const AddNoteScreen = ({ navigation }: AddNoteScreenProps) => {
  const [text, setText] = React.useState('Type text');

  const onSaveNote = async () => {
    const note: Note = {
      text,
      id: Date.now().toString(),
      title: 'sssss',
      done: false,
      importance: 'primary',
    };

    await Store.add(note);

    navigation.goBack();
  };

  const onChangeText = (text: string) => setText(text);

  const inputAccessoryViewID = 'textInput';

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        value={text}
        inputAccessoryViewID={inputAccessoryViewID}
        multiline={true}
      />
      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <Button onPress={onSaveNote} title='Save Note' />
      </InputAccessoryView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
});

type AddNoteScreenProps = {
  navigation: any,
};

export default AddNoteScreen;
