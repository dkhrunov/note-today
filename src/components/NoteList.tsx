import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Text, ScrollView, RefreshControl } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Note, NOTE_IMPORTANCES } from '../models/Note.model';
import Store from '../services/Store';
import NoteCheckbox from './NoteCheckbox';
import ThemeColors from '../shared/ThemeColors';

/**
 * Вертикальное отображение списка заметок.
 * @param props - свойства компонента.
 */
const NoteList = ({ navigation, notes, filterTerm }: NoteListProps) => {
  /**
   * Список заметок.
   */
  const [noteList, setNoteList] = useState<Note[]>(notes);
  /**
   * Состояние обновление списка заметок.
   */
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  /**
   * Сайд эффект (если ты до сих пор не знаешь что этой, то дальше тебе здесь делать нечего),
   * при изменения пропса с заметками из родительского компонента,
   * обновляет его и в состоянии текущего компонента.
   */
  useEffect(() => setNoteList(notes), [notes]);

  /**
   * Мемоизированный колбек, вызывается только при изменении состояния обновления списка заметок.
   * При обновлении списка, загружает их из хранилища.
   */
  const onRefresh = useCallback(
    async () => {
      setRefreshing(true);
      setNoteList(await Store.getAll());
      setRefreshing(false);
    },
    [isRefreshing],
  );

  /**
   * При клике на заметку, перемещает на экран ее просмотра.
   * @param note - заметка.
   */
  const onPressNote = (note: Note) => navigation.navigate('Note', note);

  /**
   * Фильтрация списка заметок по их заголовкам.
   * Если заголовк заметки содержит ключевую фразу (filterTerm),
   * то заметка включается в отфильтрованный список.
   * @param note - заметка.
   */
  const filetingByTitle = (note: Note) => {
    if (!filterTerm) {
      return true;
    }

    return note.title.toLowerCase().includes(filterTerm.toLowerCase());
  };

  /**
   * Получает сокращение из одной буквы, по выжности заметки.
   * @param importance - важность заметки.
   */
  const getImportanceShorthand = (importance: string) => (
    NOTE_IMPORTANCES.find(elem => elem.value === importance)?.shortHand
  );

  /**
   * Компонент заголовка заметки в списке.
   * @param props - свойста.
   */
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
                value: getImportanceShorthand(note.importance),
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
