
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyAvAU8jHzzH8Z1si9L4bV9BtHCDXOU3N9k",
    authDomain: "form-greydive-33bee.firebaseapp.com",
    projectId: "form-greydive-33bee",
    storageBucket: "form-greydive-33bee.appspot.com",
    messagingSenderId: "430824665290",
    appId: "1:430824665290:web:31b05d2b3af7cce4a3c433",
    measurementId: "G-YWDS71Q6S9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const analytics = getAnalytics(app);

const db = getFirestore(app);



export const sendFormData = async (surveyData: object): Promise<string> => {
    try {
      const docRef = await addDoc(collection(db, 'allAnswers'), surveyData);
      console.log('Document written with ID: ', docRef.id);
      return 'success!';
    } catch (err: any) {
      throw err;
    }
};

export const getFormData = async (): Promise<object[]> => {
    try {
      const querySnapshot = await getDocs(collection(db, 'allAnswers'));
      const formData = querySnapshot.docs.map((doc) => doc.data());
      return formData;
    } catch (err: any) {
      throw err;
    }
};

