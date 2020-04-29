import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import RoundedButton from './RoundedButton';
import ThemeColors from '../shared/ThemeColors';

/**
 * Отображает изображение по URI файла.
 * @param imageUri - URI файла.
 * @param deletePhoto - Callback для кнопки удаления фото.
 */
const NotePhoto = ({ imageUri, deletePhoto }: NotePhotoProps) => (
  <View style={styles.container}>
    <Image
      source={{ uri: imageUri }}
      style={styles.image}
    />
    <View style={styles.deleteImageButton}>
      <RoundedButton
        text='Delete'
        type='error'
        onPress={deletePhoto}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.white,
    padding: 10,
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

type NotePhotoProps = {
  imageUri: string,
  deletePhoto(): any,
};

export default NotePhoto;
