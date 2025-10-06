import { useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
const Auth = () => {
  //   const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setIsLogged(true);
    } catch (error) {
      console.error(error);
    }
  };
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLogged(true);
    } catch (error) {
      console.error(error);
    }
  };
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setIsLogged(true);
    } catch (error) {
      console.error(error);
    }
  };
  const logOut = async () => {
    try {
      await signOut(auth);
      setIsLogged(false);
    } catch (error) {
      console.error(error);
    }
  };
  if (auth.currentUser) console.log(auth.currentUser);
  else console.log("no-user-logged-in");
  return (
    <div>
      {isLogged && <h1>Hi {auth.currentUser?.uid}</h1>}
      <input type="text" placeholder="name" onChange={() => {}} />
      <input
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={register}>register</button>
      <button onClick={signIn}>sign in</button>
      <button onClick={signInWithGoogle}>sign in with google</button>
      <button onClick={logOut}>log out</button>
    </div>
  );
};

export default Auth;
