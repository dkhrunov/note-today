import React, { useState } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import RoundedButton from '../components/RoundedButton';
import ThemeColors from '../shared/ThemeColors';
import { Note, NoteImportance } from '../models/Note.model';
import Store from '../services/Store';
import { Icon } from 'react-native-elements';
import ButtonPanel from '../components/ButtonPanel';
import * as ImagePicker from 'expo-image-picker';
import NoteTitle from '../components/NoteTitle';
import NoteText from '../components/NoteText';
import SelectNoteImportance from '../components/SelectNoteImportance';
import NotePhoto from '../components/NotePhoto';

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
   * Ссылка на загружаемую фотку.
   */
  const [imageUri, setImageUri] = useState<string>(note.image || '');
  /**
   * Состояние загрузки данных.
   */
  const [isLoading, setLoaing] = useState<boolean>(false);

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
   * Обработчик события при изменения важности заметки.
   * @param value - новое значение.
   */
  const onChangeImportance = (value: NoteImportance) => setImportance(value);

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

    // вывод в асинхронный режим, пока идет анимация открытия галереи (ios)
    setTimeout(() => setLoaing(true), 200);
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    setLoaing(false);

    if (pickerResult.cancelled) {
      return;
    }

    setImageUri(pickerResult.uri);
  };

  /**
   * Обновление заметки, и переход на начальный экран.
   */
  const onUpdate = async () => {
    const updatedNote = { ...note, text, title, importance, image: imageUri };
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

  return (
    <View style={styles.container}>
      {
        isLoading
          ? (
            <View style={styles.loading}>
              <ActivityIndicator size='large' color={ThemeColors.blue} />
            </View>
          )
          : (
            <ScrollView style={{ flex: 1 }}>
              <NoteTitle value={title} onChange={onChangeTitle} />
              <NoteText value={text} onChange={onChangeText} />
              <SelectNoteImportance value={importance} onChange={onChangeImportance} />
              {
                imageUri
                  ? <NotePhoto imageUri={imageUri} deletePhoto={() => setImageUri('')} />
                  : null
              }
            </ScrollView>
          )
      }

      <ButtonPanel>
        <RoundedButton
          type='info'
          onPress={onUpdate}
          buttonStyle={styles.button}
        >
          <Icon type='material' name='done' color={ThemeColors.white} />
        </RoundedButton>

        <RoundedButton
          type='success'
          onPress={onPickImage}
          buttonStyle={styles.button}
        >
          <Icon type='material' name='collections' color={ThemeColors.white} />
        </RoundedButton>

        <RoundedButton
          type='error'
          onPress={onDelete}
          buttonStyle={styles.button}
        >
          <Icon type='material' name='delete' color={ThemeColors.white} />
        </RoundedButton>
      </ButtonPanel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.white,
    paddingTop: 10,
    paddingBottom: 10,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 50,
  },
});

type NoteScreenProps = {
  navigation: any,
  route: any,
};

export default NoteScreen;
