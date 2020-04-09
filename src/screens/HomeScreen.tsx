import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Button } from 'react-native';
import { SearchBar } from 'react-native-elements';
import NoteList from '../components/NoteList';
import AddNoteButton from '../components/AddNoteButton';
import ThemeColors from '../shared/ThemeColors';
import { Note } from '../models/Note.model';
import Store from '../services/Store';

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [search, setSearch] = useState<string>('');

  const refreshNotes = () => Store.getAll().then(notes => setNotes(notes));

  const clearAll = () => Store.removeAll().then(refreshNotes);

  // TODO отписка от addListener
  useEffect(() => navigation.addListener('focus', () => refreshNotes()), []);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        platform='ios'
        placeholder='Search note'
        showLoading={false}
        onChangeText={setSearch}
        value={search}
        containerStyle={{ backgroundColor: ThemeColors.purple }}
        inputContainerStyle={{ backgroundColor: ThemeColors.white }}
        cancelButtonProps={{
          color: ThemeColors.white,
          buttonStyle: styles.cancelButton,
        }}
      />
      <Button title='clear all' onPress={clearAll} />
      <NoteList navigation={navigation} notes={notes} />
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
