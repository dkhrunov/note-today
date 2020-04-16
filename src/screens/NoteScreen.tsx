import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import RoundedButton from '../components/RoundedButton';
import ThemeColors from '../shared/ThemeColors';
import { Note, NOTE_IMPORTANCES, NoteImportance } from '../models/Note.model';
import Store from '../services/Store';
import { Input } from 'react-native-elements';
import ModalPicker2 from '../components/ModalPicker2';
import ButtonPanel from '../components/ButtonPanel';

/**
 * Экран просмотра заметки.
 * @param navigation - содержит различные вспомогательные функции,
 * которые управляют навигацией приложения.
 * @param route - значения переданные при переходе с одного экрана на другой.
 */
const NoteScreen = ({ navigation, route }: NoteScreenProps) => {
  /**
   * Заметка, которую просматривают.
   */
  const note: Note = route.params;
  /**
   * Заголовок заметки.
   */
  const [title, setTitle] = useState(note.title);
  /**
   * Текст заметки.
   */
  const [text, setText] = useState(note.text);
  /**
   * Важность заметки.
   */
  const [importance, setImportance] = useState<NoteImportance>(note.importance);

  /**
   * Обновление заметки, и переход на начальный экран.
   */
  const onUpdate = async () => {
    const updatedNote = { ...note, text, title, importance };
    await Store.update(updatedNote.id, updatedNote);
    navigation.goBack();
  };

  /**
   * Удаление заметки из хранилища, и переход на начальный экран.
   */
  const onDelete = async () => {
    await Store.remove(note.id);
    navigation.goBack();
  };

  /**
   * Обработчик события при изменения заголовка заметки в input`e.
   * @param value - новое значение.
   */
  const onChangeTitle = (value: string) => setTitle(value);

  /**
   * Обработчик события при изменения текста заметки в input`e.
   * @param value - новое значение.
   */
  const onChangeText = (value: string) => setText(value);

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={[styles.container, { padding: 10 }]}>
          {
            note.image
              // tslint:disable-next-line: jsx-wrap-multiline
              ? <View style={styles.container}>
                <Image
                  source={{ uri: note.image }}
                  style={styles.thumbnail}
                />
              </View>
              : null
          }
          <Input
            label='Note title'
            value={title}
            containerStyle={styles.inputContainer}
            labelStyle={styles.inputLabel}
            inputStyle={styles.inputText}
            onChangeText={onChangeTitle}
          />

          <Input
            label='Note text'
            value={text}
            containerStyle={styles.inputContainer}
            labelStyle={styles.inputLabel}
            inputStyle={styles.inputText}
            onChangeText={onChangeText}
            multiline={true}
            blurOnSubmit={true}
          />

          <View style={{ marginBottom: 20 }}>
            <ModalPicker2
              label='Note importance'
              data={NOTE_IMPORTANCES}
              initialValue={importance}
              modalHeader='Select importance'
              onSelect={value => setImportance(value as NoteImportance)}
              modalStyles={{ width: '70%', height: '40%' }}
            />
          </View>
        </View>
      </ScrollView>

      <ButtonPanel>
        <RoundedButton
          type='info'
          text='Save'
          onPress={onUpdate}
          buttonStyle={{ width: '45%' }}
        />
        <RoundedButton
          type='error'
          text='Delete'
          onPress={onDelete}
          buttonStyle={{ width: '45%' }}
        />
      </ButtonPanel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.white,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 18,
    color: ThemeColors.black,
  },
  inputText: {
    fontSize: 15,
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});

type NoteScreenProps = {
  navigation: any,
  route: any,
};

export default NoteScreen;
