import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import { ListItem, CheckBox } from 'react-native-elements';
import { Note } from '../models/Note.model';

const NoteList = ({ navigation, notes }: NoteListProps) => {
  const onPressNote = (note: Note) => navigation.navigate('Note', note);

  return (
    <ScrollView style={styles.container}>
      {notes.map((note: Note) => (
        <ListItem
          key={note.id}
          title={note.title}
          titleStyle={{ fontWeight: '600' }}
          subtitle={<Text numberOfLines={1}>{note.text}</Text>}
          badge={{
            value: '',
            status: note.importance,
          }}
          checkmark={note.done}
          leftElement={<CheckBox checked={note.done} containerStyle={styles.checkBox} />}
          onPress={() => onPressNote(note)}
          chevron={true}
          bottomDivider={true}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  checkBox: {
    margin: 0,
    padding: 0,
  },
});

type NoteListProps = {
  navigation: any,
  notes: Note[],
};

export default NoteList;
