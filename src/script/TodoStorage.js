/**
 * Функция для проверки строки на JSON
 * @param str
 * @returns {boolean}
 * @constructor
 */
var isJsonString = function (str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

/**
 * @type {{storage: Storage, setObject: Function , setString: Function , get: Function }}
 */
var StorageHelper = {
  storage: window.localStorage,
  setObject: function (name, object) {
    var string = JSON.stringify(object);
    this.storage.setItem(name, string);
  },
  setString: function (name, string) {
    this.storage.setItem(name, string);
  },
  get: function (name) {
    var result = this.storage.getItem(name);
    if (!result) {
      return false;
    }
    if (isJsonString(result)) {
      return JSON.parse(result);
    }
    return result;
  }
};

var TodoStorage = {
  storageName: 'todo_storage',
  data: [],
  create: function () {
    if (this.getAll()) {
      return false;
    }
    StorageHelper.setObject(this.storageName, []);
  },
  getAll: function () {
    this.data = StorageHelper.get(this.storageName);
    console.log('я взял из стораджа все данные');
    console.log('data', TodoStorage.data);
    return this.data;
  },
  addItem: function (item) {
    var arr = this.data;
    arr.push(item);
    StorageHelper.setObject(this.storageName, arr);
    console.log('я добавил в сторедж новую цель');
    console.log('item', item);
  }
};
