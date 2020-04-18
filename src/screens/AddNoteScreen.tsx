import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, Alert, ActivityIndicator } from 'react-native';
import { Input, Icon } from 'react-native-elements';
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
      {
        isLoading
          // tslint:disable-next-line: jsx-wrap-multiline
          ? <View style={styles.loading}>
            <ActivityIndicator size='large' color={ThemeColors.blue} />
          </View>
          : <ScrollView style={{ flex: 1 }}>
            <View style={[styles.container, { padding: 10 }]}>
              {
                imageUri
                  // tslint:disable-next-line: jsx-wrap-multiline
                  ? <View style={styles.container}>
                    <Image
                      source={{ uri: imageUri }}
                      style={styles.image}
                    />
                    <View style={styles.deleteImageButton}>
                      <RoundedButton
                        text='Delete'
                        type='error'
                        onPress={() => setImageUri('')}
                      />
                    </View>
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
      }

      <ButtonPanel>
        <RoundedButton
          type='info'
          onPress={onSaveNote}
          buttonStyle={{ width: 60, height: 60, borderRadius: 50 }}
        >
          <Icon type='material' name='add' color={ThemeColors.white} />
        </RoundedButton>

        <RoundedButton
          type='success'
          onPress={onPickImage}
          buttonStyle={{ width: 60, height: 60, borderRadius: 50 }}
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
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
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
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
  },
  deleteImageButton: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 10,
    paddingTop: 20,
    paddingBottom: 30,
  },
});

type AddNoteScreenProps = {
  navigation: any,
};

export default AddNoteScreen;
