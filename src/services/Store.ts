import { Note } from '../models/Note.model';
import { AsyncStorage } from 'react-native';

class Store {

  /**
   * Получить заметку по её ID из хранилища.
   * @param noteId - ID заметки
   */
  public async get(noteId: string): Promise<Note | undefined> {
    try {
      const data = await AsyncStorage.getItem(noteId);
      return data ? JSON.parse(data) : Error(`Not found by id - ${noteId}`);
    } catch (error) {
      console.error('Error occured when adding new note: ', error);
    }
  }

  /**
   * Получить заметку по её ID из хранилища.
   * @param noteId - ID заметки
   */
  public async getAll(): Promise<Note[]> {
    try {
      const parseStorageData = (data: Array<[string, string]>): Array<Note> =>
        data.map(elem => JSON.parse(elem[1]));

      const keys: Array<string> = await AsyncStorage.getAllKeys();
      const multiGet: Array<[string, string]> = await AsyncStorage.multiGet(keys);
      const notes: Array<Note> = await parseStorageData(multiGet);

      return notes;
    } catch (error) {
      console.error('Error occured when adding new note: ', error);
      return [];
    }
  }

  /**
   * Добавить новую заметку в хранилише.
   * @param note - объект заметки
   */
  public async add(note: Note) {
    try {
      await AsyncStorage.setItem(note.id, JSON.stringify(note));
    } catch (error) {
      console.error('Error occured when adding new note: ', error);
    }
  }

  /**
   * Изменить заметку в хранилише.
   * @param noteId - ID заметки
   * @param newData - новые значения
   */
  public async update(noteId: string, newData: Note) {
    try {
      await AsyncStorage.mergeItem(noteId, JSON.stringify(newData));
    } catch (error) {
      console.error('Error occurred when updating note: ', error);
    }
  }

  /**
   * Удалить заметку из хранилища.
   * @param noteId - ID заметки
   */
  public async remove(noteId: string) {
    try {
      await AsyncStorage.removeItem(noteId);
    } catch (error) {
      console.error('Error occured when deleting note: ', error);
    }
  }

  /**
   * Очистить полностью хранилище.
   */
  public async removeAll() {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Error occured when deleting note: ', error);
    }
  }
}

export default new Store();
