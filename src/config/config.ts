import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const config = {
  firebaseConfig : {
    apiKey: "AIzaSyDpLGx4p-fHvML9BgFVT4JJouwFIBWu6p4",
    authDomain: "food-order-ebb97.firebaseapp.com",
    projectId: "food-order-ebb97",
    storageBucket: "food-order-ebb97.appspot.com",
    messagingSenderId: "35369773628",
    appId: "1:35369773628:web:e7c79ff036fe30e77a3139",
    measurementId: "G-K581L0V29V"
  }
}

export const app = initializeApp(config.firebaseConfig) ;
export const storage = getStorage(app);