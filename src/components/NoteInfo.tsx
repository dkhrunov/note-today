import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Input } from 'react-native-elements';
import ModalPicker2 from './ModalPicker2';
import { NOTE_IMPORTANCES, NoteImportance } from '../models/Note.model';
import NotePhoto from './NotePhoto';
import ThemeColors from '../shared/ThemeColors';

const NoteInfo = ({
  title,
  text,
  importance,
  imageUri,
  onChangeTitle,
  onChangeText,
  onChangeImportance,
  onDeletePhoto,
}: NoteInfoProps) => (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Input
          label='Note title'
          placeholder='Create a name for the note'
          value={title}
          onChangeText={value => onChangeTitle(value)}
          containerStyle={styles.inputContainer}
          labelStyle={styles.inputLabel}
          inputStyle={styles.inputText}
        />

        <Input
          label='Note text'
          placeholder='What would you like to do?'
          value={text}
          onChangeText={value => onChangeText(value)}
          containerStyle={styles.inputContainer}
          labelStyle={styles.inputLabel}
          inputStyle={styles.inputText}
          multiline={true}
          blurOnSubmit={true}
        />

        <View style={{ marginBottom: 20 }}>
          <ModalPicker2
            label='Note importance'
            modalHeader='Select importance'
            data={NOTE_IMPORTANCES}
            initialValue={importance}
            onSelect={value => onChangeImportance(value as NoteImportance)}
            modalStyles={styles.modal}
          />
        </View>

        {
          imageUri ? <NotePhoto imageUri={imageUri} deletePhoto={onDeletePhoto} /> : null
        }
      </View>
    </ScrollView>
  );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ThemeColors.white,
    padding: 10,
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
  modal: {
    width: '70%',
    height: '40%',
  },
});

type NoteInfoProps = {
  title: string,
  text: string,
  importance: NoteImportance,
  imageUri: string,
  onChangeTitle(value: string): any,
  onChangeText(value: string): any,
  onChangeImportance(value: NoteImportance): any,
  onDeletePhoto(): any,
};

export default NoteInfo;
