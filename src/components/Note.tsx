import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const Note = (props) => {
  // Убрать navigation и вынести в родительский компонент onPress
  const { navigation } = props;
  const NoteData: INote = props.data;

  const tagColor = NoteData.tagColor
    ? { backgroundColor: NoteData.tagColor }
    : { backgroundColor: "#e0e0e0" };

  const onPress = () => navigation.navigate("Note", NoteData);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.noteContainer}>
          <View style={[styles.tag, tagColor]}></View>
          <View style={styles.noteData}>
            <Text style={styles.header}>{NoteData.header}</Text>
            <Text numberOfLines={1}>{NoteData.text}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tag: {
    height: "100%",
    width: 10,
    marginRight: 5,
    opacity: 0.8,
  },
  noteContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    minHeight: 50,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  noteData: {
    flex: 1,
    paddingTop: 5,
  },
  header: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default Note;

export interface INote {
  id: string;
  header: string;
  text: string;
  done: boolean;
  tagColor: string;
}
