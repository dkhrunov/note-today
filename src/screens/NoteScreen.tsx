import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import RoundedButton from '../components/RoundedButton';
import ThemeColors from '../shared/ThemeColors';
import { Note } from '../models/Note.model';
import Store from '../services/Store';

const NoteScreen = ({ navigation, route }: NoteScreenProps) => {
  const note: Note = route.params;
  const [title, setTitle] = React.useState(note.title);
  const [text, setText] = React.useState(note.text);

  const onUpdate = async () => {
    const updatedNote = { ...note, text, title };
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
      <View style={styles.editPanel}>
        <View style={styles.row}>
          <Text style={styles.title}>Title :</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeTitle}
            value={title}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.title}>Note text :</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeText}
            value={text}
            multiline={true}
          />
        </View>
      </View>

      {/* TODO добавить изменение статуса и готовности  */}

      {/* <Text>{JSON.stringify(note)}</Text> */}

      <View style={styles.buttonPanel}>
        <RoundedButton type='info' text='Save' onPress={onUpdate} />
        <RoundedButton type='error' text='Delete' onPress={onDelete} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editPanel: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  row: {
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  textInput: {
    borderColor: ThemeColors.black,
  },
  buttonPanel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    backgroundColor: ThemeColors.white,
  },
});

type NoteScreenProps = {
  navigation: any,
  route: any,
};

export default NoteScreen;
