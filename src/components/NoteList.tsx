import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, RefreshControl } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Note, NOTE_IMPORTANCES } from '../models/Note.model';
import Store from '../services/Store';
import NoteCheckbox from './NoteCheckbox';
import ThemeColors from '../shared/ThemeColors';

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

  const NoteSubtitle = ({ text, isNoteDone }: NoteSubtitleProps) => (
    <Text
      numberOfLines={1}
      style={[
        styles.noteSubtitle,
        isNoteDone ? { textDecorationLine: 'line-through' } : {},
      ]}
    >
      {text}
    </Text>
  );

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
              subtitle={<NoteSubtitle text={note.text} isNoteDone={note.done} />}
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
  noteSubtitle: {
    color: ThemeColors.grey,
  },
});

type NoteSubtitleProps = {
  text: string,
  isNoteDone: boolean,
}

export type NoteListProps = {
  navigation: any,
  notes: Note[],
  filterTerm?: string,
};


export default NoteList;
