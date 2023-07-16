import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyC3Ng714csHCuhsx7_er4OiL-lyRLHQdcY",
    authDomain: "p2p-commerce.firebaseapp.com",
    projectId: "p2p-commerce",
    storageBucket: "p2p-commerce.appspot.com",
    messagingSenderId: "188014306548",
    appId: "1:188014306548:web:e20fec4ce8c857a8a1eaa1"
};

export default function register() {
  initializeApp(firebaseConfig);
}
