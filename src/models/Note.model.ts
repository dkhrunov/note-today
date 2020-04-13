export type Note = {
  id: string,
  title: string,
  text: string,
  importance: NoteImportance,
  done: boolean,
};

export type NoteImportance = 'success' | 'error' | 'warning' | 'primary';

export const NOTE_IMPORTANCES = [
  { key: 0, label: 'Standart', value: 'primary', shortHand: 'S' },
  { key: 1, label: 'Low', value: 'success', shortHand: 'L' },
  { key: 2, label: 'Medium', value: 'warning', shortHand: 'M' },
  { key: 3, label: 'Important', value: 'error', shortHand: 'I' },
];
