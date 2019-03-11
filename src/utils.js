import SimpleCrypto from "simple-crypto-js";
import shortid from 'shortid';
import firebase from 'firebase'

firebase.initializeApp({
  apiKey: 'AAAAfZCxCQc:APA91bHTS1b-C648cFrCLysCdr3V-OgDfdX-DC01-0kYsi-V5RzRog5cMXUPqPGJKGUVAdNuvDPv1fmjUtNbtWsAG52Z5gUl46WfUjqh1oHJQV2RFF_FS2veGoLDbP-twCo1dzpmj4iN',
  authDomain: 'cookie-clicker-af0cd.firebaseapp.com',
  projectId: 'cookie-clicker-af0cd',
});

const db = firebase.firestore();
const users = db.collection("users");
const secret = "cookie-clicker";

class Storage extends SimpleCrypto {
  constructor() {
    super(secret);
    let data = window.localStorage.data
    if (data) {
      data = this.decrypt(data, true);
      console.log('data', data);
    } else {
      const id = shortid();
      const username = 'cookiemonster';
      data = {
        id,
        username,
      }
      users.doc(id).set({
        username,
        id,
        cookies: 0,
      })
    }
    window.localStorage.data = this.encrypt(data);
  }

  getItem = key => {
    const data = this.decrypt(window.localStorage.data, true);
    return data[key];
  }

  setItem = (key, item) => {
    let data = this.decrypt(window.localStorage.data, true);
    data[key] = item;
    window.localStorage.data = this.encrypt(data);
    return true;
  }

  broadcast = async () => {
    const cookies = this.getItem('cookies') || 0;
    const id = this.getItem('id');
    const username = this.getItem('username');
    await users.doc(id).set({cookies, id, username});
    const result = await users.orderBy("cookies", "desc").limit(3).get();
    const topUsers = result.docs.map(doc => doc.data());
    console.log(topUsers);
    return topUsers;
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
