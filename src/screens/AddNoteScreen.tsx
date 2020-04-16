import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import { Note, NoteImportance, NOTE_IMPORTANCES } from '../models/Note.model';
import Store from '../services/Store';
import ThemeColors from '../shared/ThemeColors';
import ModalPicker2 from '../components/ModalPicker2';
import RoundedButton from '../components/RoundedButton';
import * as ImagePicker from 'expo-image-picker';
import ButtonPanel from '../components/ButtonPanel';

/**
 * Экран создания новых заметок.
 * @param navigation - содержит различные вспомогательные функции,
 * которые управляют навигацией приложения.
 */
const AddNoteScreen = ({ navigation }: AddNoteScreenProps) => {
  /**
   * Заголовок заметки.
   */
  const [title, setTitle] = useState<string>('');
  /**
   * Текст заметки.
   */
  const [text, setText] = useState<string>('');
  /**
   * Важность заметки.
   */
  const [importance, setImportance] = useState<NoteImportance>('primary');
  /**
   * Ссылка на загружаемую фотку.
   */
  const [imageUri, setImageUri] = useState<string>('');

  // TODO валидация
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

  /**
   * Выбор фотографии из галереии, при первом запуске запросит права,
   * после получения прав, можно будет выбрать фото из галереии и ее ссылка сохранится в состоянии.
   */
  const onPickImage = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled) {
      return;
    }

    setImageUri(pickerResult.uri);
  };

  /**
   * Сохраняет новую заметку в хранилище
   * и возвращает на главный экран.
   */
  const onSaveNote = async () => {
    const note: Note = {
      text,
      title,
      importance,
      id: Date.now().toString(),
      done: false,
      image: imageUri,
    };

    await Store.add(note);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={[styles.container, { padding: 10 }]}>
          {
            imageUri
              // tslint:disable-next-line: jsx-wrap-multiline
              ? <View style={styles.container}>
                <Image
                  source={{ uri: imageUri }}
                  style={styles.thumbnail}
                />
              </View>
              : null
          }
          <Input
            label='Note title'
            placeholder='Create a name for the note'
            containerStyle={styles.inputContainer}
            labelStyle={styles.inputLabel}
            inputStyle={styles.inputText}
            onChangeText={onChangeTitle}
          />

          <Input
            label='Note text'
            placeholder='What would you like to do?'
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
              modalHeader='Select importance'
              onSelect={value => setImportance(value as NoteImportance)}
              modalStyles={{ width: '70%', height: '40%' }}
            />
          </View>
        </View>
      </ScrollView>

      <ButtonPanel>
        <RoundedButton
          text='Create'
          type='info'
          onPress={onSaveNote}
          buttonStyle={{ width: '45%' }}
        />
        <RoundedButton
          text='Pick a photo'
          type='success'
          onPress={onPickImage}
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
    width: '100%',
    height: 250,
    resizeMode: 'contain',
  },
});

type AddNoteScreenProps = {
  navigation: any,
};

export default AddNoteScreen;
