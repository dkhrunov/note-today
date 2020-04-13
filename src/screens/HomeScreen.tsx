import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import NoteList from '../components/NoteList';
import AddNoteButton from '../components/AddNoteButton';
import ThemeColors from '../shared/ThemeColors';
import { Note } from '../models/Note.model';
import Store from '../services/Store';
import withLoadingIndicator from '../services/withLoadingIndicator';
import TestingButtons from '../components/TestingButtons';
import withEmpty from '../services/withEmpty';
import EmptyNotesMessage from '../components/EmptyNotesMassage';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setLoaing] = useState<boolean>(false);

  useEffect(() => { gellAllNotes(); }, []);

  const gellAllNotes = async () => {
    setLoaing(true);
    await setNotes(await Store.getAll());
    setLoaing(false);
  };

  useEffect(() => navigation.addListener('focus', onFocusScreen, []));

  const onFocusScreen = async () => setNotes(await Store.getAll());

  const onSearch = (value: string) => setSearchTerm(value);

  const NoteListWithEmpty = withEmpty(NoteList, EmptyNotesMessage);
  const NoteListWithConditionalRendering = withLoadingIndicator(NoteListWithEmpty);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        platform='ios'
        placeholder='Search note'
        showLoading={false}
        onChangeText={onSearch}
        value={searchTerm}
        containerStyle={{ backgroundColor: ThemeColors.blue }}
        inputContainerStyle={{ backgroundColor: ThemeColors.white }}
        cancelButtonProps={{
          color: ThemeColors.white,
          buttonStyle: styles.cancelButton,
        }}
      />

      {/* FOR TESTING */}
      {/* <TestingButtons refreshNotes={gellAllNotes} /> */}

      <NoteListWithConditionalRendering
        navigation={navigation}
        notes={notes}
        filterTerm={searchTerm}
        loading={isLoading}
        empty={notes.length === 0 ? true : false}
      />

      <AddNoteButton navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  cancelButton: {
    backgroundColor: ThemeColors.red,
    borderRadius: 15,
    margin: 10,
  },
});

type HomeScreenProps = {
  navigation: any,
};

export default HomeScreen;
