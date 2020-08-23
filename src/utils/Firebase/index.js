import firebase from 'firebase'

var config = {
      apiKey: "AIzaSyCx9r_WtvyWHWR-fgYmfHEgwVnS_0NW4Q0",
      authDomain: "imageuploader-49ffc.firebaseapp.com",
      databaseURL: "https://imageuploader-49ffc.firebaseio.com",
      projectId: "imageuploader-49ffc",
      storageBucket: "imageuploader-49ffc.appspot.com",
      messagingSenderId: "403683299109",
      appId: "1:403683299109:web:97be4133ea42b4a55ad4cc",
      measurementId: "G-CL1WQH2443"
};

firebase.initializeApp(config);

export const storage = firebase.storage();
