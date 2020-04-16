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

/**
 * Начальный экран. Список заметок.
 * @param navigation - содержит различные вспомогательные функции,
 * которые управляют навигацией приложения.
 */
const HomeScreen = ({ navigation }: HomeScreenProps) => {
  /**
   * Список заметок.
   */
  const [notes, setNotes] = useState<Note[]>([]);
  /**
   * Ключевое слово для фильтрации заметок.
   */
  const [searchTerm, setSearchTerm] = useState<string>('');
  /**
   * Состояние загрузки данных.
   */
  const [isLoading, setLoaing] = useState<boolean>(false);

  /**
   * Сайд эффект, получет все заметки при монтировании компонента
   * ( когда компонент загружается впервые ).
   */
  useEffect(() => { gellAllNotes(); }, []);

  /**
   * Загрузка всех заметок из хранилища.
   * После получения сохраняет в состоянии компонента.
   */
  const gellAllNotes = async () => {
    setLoaing(true);
    setNotes(await Store.getAll());
    setLoaing(false);
  };

  /**
   * Сайд эффект, подписывается на событие фокуса экрана.
   * При каждом фокусе экрана обновляет список заметок из хранилища.
   */
  useEffect(() => navigation.addListener('focus', gellAllNotes, []));

  /**
   * При каждом новом слове поиска ( фильтрации ),
   * записывает значение в состояние.
   * @param value - новое значение.
   */
  const onSearch = (value: string) => setSearchTerm(value);

  /**
   * Список заметок с условным рендерингом при пустом значении. 
   */
  const NoteListWithEmpty = withEmpty(NoteList, EmptyNotesMessage);
  /**
   * Список заметок с условным рендерингом при пустом значении и при загрузке. 
   */
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
