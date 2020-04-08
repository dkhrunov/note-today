import React from "react";
import { Text, View, StyleSheet, AsyncStorage } from "react-native";
import { INote } from "../components/Note";
import { TextInput } from "react-native-gesture-handler";
import Separator from "../components/Separator";
import RoundedButton from "../components/RoundedButton";
import ThemeColors from "../shared/ThemeColors";

const NoteScreen = (props) => {
  const { navigation } = props;
  const note: INote = props.route.params;
  const [headerValue, onChangeHeaderValue] = React.useState(note.header);
  const [textValue, onChangeTextValue] = React.useState(note.text);

  const onSave = async () => {
    const newNote = { ...note, header: headerValue, text: textValue };
    await AsyncStorage.removeItem(note.id);
    await AsyncStorage.setItem(note.id, JSON.stringify(newNote));
    navigation.goBack();
  };

  const onClose = async () => {
    await AsyncStorage.removeItem(note.id);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.editPanel}>
        <View style={styles.row}>
          <Text style={styles.title}>Title :</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => onChangeHeaderValue(text)}
            value={headerValue}
          />
        </View>
        <Separator />
        <View style={styles.row}>
          <Text style={styles.title}>Note text :</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => onChangeTextValue(text)}
            value={textValue}
            multiline
          />
        </View>
        <Separator />
      </View>

      {/* TODO добавить изменение статуса и готовности  */}

      {/* <Text>{JSON.stringify(note)}</Text> */}

      <View style={styles.buttonPanel}>
        <RoundedButton type="info" text="Save" onClick={onSave} />
        <RoundedButton type="error" text="Delete" onClick={onClose} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  editPanel: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  row: {
    width: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  textInput: {
    borderColor: ThemeColors.black,
  },
  buttonPanel: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    backgroundColor: ThemeColors.white,
  },
});

export default NoteScreen;
