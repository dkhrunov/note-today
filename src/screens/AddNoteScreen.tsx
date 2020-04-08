import React from "react";
import {
  TextInput,
  View,
  Button,
  InputAccessoryView,
  AsyncStorage,
  StyleSheet,
} from "react-native";
import { INote } from "../components/Note";

const AddNoteScreen = (props) => {
  const { navigation } = props;

  const [value, onChangeText] = React.useState("Type text");

  const onSaveNote = async () => {
    let data: INote = {
      id: Date.now().toString(),
      header: "header",
      text: value,
      done: false,
      tagColor: "",
    };

    await AsyncStorage.setItem(data.id, JSON.stringify(data));
    navigation.goBack();
  };

  const onShowLast = async () => {
    try {
      const data = await AsyncStorage.getItem("notes");
      if (data !== null) {
        let note = JSON.parse(data);
        onChangeText(note.text);
      }
    } catch (error) {
      // Error retrieving data
    }
  };

  const inputAccessoryViewID = "textInput";

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        onChangeText={(text) => onChangeText(text)}
        value={value}
        inputAccessoryViewID={inputAccessoryViewID}
        multiline
      />
      <InputAccessoryView nativeID={inputAccessoryViewID}>
        <Button onPress={onSaveNote} title="Save Note" />
      </InputAccessoryView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
});

export default AddNoteScreen;
