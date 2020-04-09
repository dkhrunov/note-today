export type Note = {
  id: string,
  title: string,
  text: string,
  importance: NoteImportance,
  done: boolean,
};

export type NoteImportance = 'success' | 'error' | 'warning' | 'primary';
