import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyD_VWx1hx30o8kRFXHtLozpJQNGeO8aHGI",
  authDomain: "netflix-clone-733fd.firebaseapp.com",
  projectId: "netflix-clone-733fd",
  storageBucket: "netflix-clone-733fd.firebasestorage.app",
  messagingSenderId: "941107151679",
  appId: "1:941107151679:web:036b5a9c09db58ed8c498a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Sign up function
const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

// Login function — fixed to accept email & password
const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};

// Logout function
const logout = () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };
