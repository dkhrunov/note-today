import React, { useEffect, useState } from "react";
import { SafeAreaView, AsyncStorage, StyleSheet } from "react-native";
import { SearchBar, ListItem } from "react-native-elements";
import NoteList from "../components/NoteList";
import AddNoteButton from "../components/AddNoteButton";
import { INote } from "../components/Note";
import ThemeColors from "../shared/themeColors";

const HomeScreen = (props) => {
  const { navigation } = props;
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  const parseStorageData = (data: Array<[string, string]>): Array<INote> =>
    data.map((elem) => JSON.parse(elem[1]));

  const getAllNotes = async (): Promise<INote[]> => {
    const keys: Array<string> = await AsyncStorage.getAllKeys();
    const notes: Array<INote> = await parseStorageData(
      await AsyncStorage.multiGet(keys)
    );

    console.log(keys, notes);
    return notes;
  };

  const refreshNotes = () =>
    getAllNotes().then((notes: Array<INote>) => setNotes(notes));

  // Проблема с тем что список обновляется только при загрузке страницы,
  // а если сделать без [] то бесконечный цикл
  useEffect(() => {
    refreshNotes();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        platform="ios"
        placeholder="Search note"
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

export default HomeScreen;
