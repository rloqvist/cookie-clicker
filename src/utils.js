import SimpleCrypto from "simple-crypto-js";
import shortid from 'shortid';

const secret = "cookie-clicker";

class Storage extends SimpleCrypto {
  constructor() {
    super(secret);
    let data = window.localStorage.data
    if (data) {
      data = this.decrypt(data, true);
      console.log('data', data);
    } else {
      const id = shortid()
      data = {
        id,
      }
    }
    window.localStorage.data = this.encrypt(data)
  }

  getItem = key => {
    const data = this.decrypt(window.localStorage.data);
    return data[key];
  }

  setItem = (key, item) => {
    let data = this.decrypt(window.localStorage.data);
    data[key] = item;
    window.localStorage.data = this.encrypt(data);
    return true
  }
}

export const spaceSeparate = number => {
  return number
    .toString()
    .split('')
    .slice()
    .reverse()
    .map((x, index) => {
      return index % 3 === 0 ? x + ' ' : x;
    })
    .reverse()
    .join('');
};

export default new Storage();
