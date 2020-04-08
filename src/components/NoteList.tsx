import React from "react";
import { StyleSheet, FlatList, View, Text, ScrollView } from "react-native";
import Note, { INote } from "./Note";
import Separator from "./Separator";
import { ListItem, CheckBox } from "react-native-elements";

const NoteList = (props) => {
  const { navigation } = props;
  const notes: Array<INote> = props.notes;

  return (
    <ScrollView style={styles.container}>
      {notes.map((note: INote) => (
        <ListItem
          key={note.id}
          title={note.header}
          titleStyle={{ fontWeight: "600" }}
          subtitle={<Text numberOfLines={1}>{note.text}</Text>}
          badge={{
            value: "",
            status: "success",
          }}
          checkmark={note.done}
          leftElement={
            <CheckBox
              checked={note.done}
              onPress={() => {}}
              containerStyle={{ margin: 0, padding: 0 }}
            />
          }
          onPress={() => navigation.navigate("Note", note)}
          chevron
          bottomDivider
        />
      ))}
    </ScrollView>

    // <FlatList
    //   data={notes}
    //   renderItem={({ item }) => <Note navigation={navigation} data={item} />}
    //   keyExtractor={(item: INote) => item.id}
    //   ItemSeparatorComponent={() => <Separator />}
    //   style={styles.container}
    // />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingLeft: 10,
    // paddingRight: 10,
    // marginTop: 10,
    width: "100%",
  },
});

export default NoteList;
