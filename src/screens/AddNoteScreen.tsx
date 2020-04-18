import React, { useState } from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { Note, NoteImportance, NOTE_IMPORTANCES } from '../models/Note.model';
import Store from '../services/Store';
import ThemeColors from '../shared/ThemeColors';
import RoundedButton from '../components/RoundedButton';
import * as ImagePicker from 'expo-image-picker';
import ButtonPanel from '../components/ButtonPanel';
import NoteInfo from '../components/NoteInfo';
import withLoadingIndicator from '../services/withLoadingIndicator';
import NoteTitle from '../components/NoteTitle';
import NoteText from '../components/NoteText';
import ModalPicker2 from '../components/ModalPicker2';
import NotePhoto from '../components/NotePhoto';

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
        <NoteTitle value={title} onChange={onChangeTitle} />

        <NoteText value={text} onChange={onChangeText} />

        {/* TODO NoteImportance */}
        <ModalPicker2
          label='Note importance'
          modalHeader='Select importance'
          data={NOTE_IMPORTANCES}
          initialValue={importance}
          onSelect={value => onChangeImportance(value as NoteImportance)}
          modalStyles={styles.modal}
        />

        {
          imageUri ? <NotePhoto imageUri={imageUri} deletePhoto={() => setImageUri('')} /> : null
        }
      </ScrollView>

      <ButtonPanel>
        <RoundedButton
          type='info'
          onPress={onSaveNote}
          buttonStyle={styles.button}
        >
          <Icon type='material' name='add' color={ThemeColors.white} />
        </RoundedButton>

        <RoundedButton
          type='success'
          onPress={onPickImage}
          buttonStyle={styles.button}
        >
          <Icon type='material' name='collections' color={ThemeColors.white} />
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
  modal: {
    width: '70%',
    height: '40%',
  },
});

type AddNoteScreenProps = {
  navigation: any,
};

export default AddNoteScreen;
