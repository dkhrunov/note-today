import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, RefreshControl } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Note, NOTE_IMPORTANCES } from '../models/Note.model';
import Store from '../services/Store';
import NoteCheckbox from './NoteCheckbox';

const NoteList = ({ navigation, notes, filterTerm }: NoteListProps) => {
  const [noteList, setNoteList] = useState<Note[]>(notes);
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => setNoteList(notes), [notes]);

  const onRefresh = useCallback(
    async () => {
      setRefreshing(true);
      setNoteList(await Store.getAll());
      setRefreshing(false);
    },
    [isRefreshing],
  );

  const onPressNote = (note: Note) => navigation.navigate('Note', note);

  const filetingByTitle = (note: Note) => {
    if (!filterTerm) {
      return true;
    }

    return note.title.toLowerCase().includes(filterTerm.toLowerCase());
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
    >
      {
        noteList.filter(filetingByTitle)
          .map((note: Note) => (
            <ListItem
              key={note.id}
              title={note.title}
              titleStyle={styles.ListItemTitle}
              subtitle={<Text numberOfLines={1}>{note.text}</Text>}
              badge={{
                value: NOTE_IMPORTANCES.find(elem => elem.value === note.importance)?.shortHand,
                status: note.importance,
              }}
              leftElement={<NoteCheckbox note={note} />}
              onPress={() => onPressNote(note)}
              chevron={true}
              bottomDivider={true}
            />
          ))
      }
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  ListItemTitle: {
    fontWeight: '600',
  },
});

export type NoteListProps = {
  navigation: any,
  notes: Note[],
  filterTerm?: string,
};

export default NoteList;
