
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyDxgrZKZaFqVehJcdL532ty9mgpRQKT7i0",
  authDomain: "lms-project-8953f.firebaseapp.com",
  projectId: "lms-project-8953f",
  storageBucket: "lms-project-8953f.appspot.com",
  messagingSenderId: "352129207066",
  appId: "1:352129207066:web:cd3ccb6158819f43f43aa3"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db=getFirestore(app);
export default app;