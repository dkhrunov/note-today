import { Note } from '../models/Note.model';
import { AsyncStorage } from 'react-native';

/**
 * Класс для работы с данными в приложении.
 */
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
   * @param updatedNote - новые значения
   */
  public async update(noteId: string, updatedNote: Note) {
    try {
      await AsyncStorage.mergeItem(noteId, JSON.stringify(updatedNote));
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

  /**
   * FOR TEST!
   *
   * Mocking. заполянет хралище 10 тестовыми заметками
   */
  public async addTenNotes() {
    const notes: Note[] = [
      {
        id: Date.now().toString(),
        title: '1 item',
        text: 'In nibh mauris cursus mattis molestie. Sed nisi lacus sed viverra tellus in hac habitasse.',
        importance: 'success',
        done: true,
      },
      {
        id: (Date.now() + 1).toString(),
        title: '2 item',
        text: 'Ac felis donec et odio pellentesque diam. Accumsan sit amet nulla facilisi.',
        importance: 'primary',
        done: true,
      },
      {
        id: (Date.now() + 2).toString(),
        title: '3 item',
        text: 'Egestas erat imperdiet sed euismod nisi porta lorem.',
        importance: 'success',
        done: true,
      },
      {
        id: (Date.now() + 3).toString(),
        title: '4 item',
        text: 'Gravida rutrum quisque non tellus orci.',
        importance: 'warning',
        done: true,
      },
      {
        id: (Date.now() + 4).toString(),
        title: '5 item',
        text: 'Urna duis convallis convallis tellus id interdum. Posuere urna nec tincidunt praesent semper.',
        importance: 'error',
        done: false,
      },
      {
        id: (Date.now() + 5).toString(),
        title: '6 item',
        text: 'Etiam non quam lacus suspendisse faucibus interdum posuere lorem.',
        importance: 'success',
        done: true,
      },
      {
        id: (Date.now() + 6).toString(),
        title: '7 item',
        text: 'Viverra adipiscing at in tellus integer feugiat scelerisque varius.',
        importance: 'warning',
        done: false,
      },
      {
        id: (Date.now() + 7).toString(),
        title: '8 item',
        text: 'Urna duis convallis convallis tellus id interdum. Posuere urna nec tincidunt praesent semper.',
        importance: 'primary',
        done: false,
      },
      {
        id: (Date.now() + 8).toString(),
        title: '9 item',
        text: 'Feugiat scelerisque varius morbi enim nunc faucibus. Ultrices mi tempus imperdiet nulla malesuada pellentesque elit.',
        importance: 'success',
        done: true,
      },
      {
        id: (Date.now() + 9).toString(),
        title: '10 item',
        text: 'Viverra adipiscing at in tellus integer feugiat scelerisque varius.',
        importance: 'error',
        done: true,
      },
    ];

    notes.forEach(async (note: Note) => await this.add(note));
  }
}

export default new Store();
