import * as React from "react";
import { MouseEventHandler, useContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  getAuth,
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../config/config";
import { db } from "../config/db";

const auth = getAuth();
const provider = new GoogleAuthProvider();

interface AuthData {
  signInPopup: MouseEventHandler<HTMLButtonElement> | undefined;
  currentUser: User | null;
  loading: boolean;
  logOut: () => Promise<void>;
  role: string | null;
  SignUpWithEmailAndPassword: (
    email: string,
    password: string,
    displayName: string
  ) => any;
  signInEmailPassword: (
    email: string,
    password: string,
  ) => any;
}

const AuthContext = React.createContext<AuthData | null>(null);

export const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    return auth.onIdTokenChanged(async (user) => {
      const db = getFirestore(app);
      if (user?.uid) {
        const q = query(
          collection(db, "user_info"),
          where("user_id", "==", user?.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((element) => {
          setRole(element.data().role);
        });
      }
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const signInPopup = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        await addDoc(collection(db, "user_info"), {
          user_id: result.user.uid,
          role: "User",
        }).then(() => {
          setCurrentUser(result.user);
          navigate("/");
          setLoading(false);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const SignUpWithEmailAndPassword = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    setLoading(true);
    let err: string = "";
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (data) => {
        await updateProfile(data.user, {
          displayName: displayName,
        }).then(async () => {
          await addDoc(collection(db, "user_info"), {
            user_id: data.user.uid,
            role: "User",
          }).then(() => {
            setCurrentUser(data.user);
            navigate("/");
            setLoading(false);
          });
        });
      })
      .catch((e) => {
        err = e.message;
        setLoading(false);
      });

    return err;
  };

  const signInEmailPassword = async (email: string, password: string) => {
    setLoading(true);
    let err: string = "";
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setCurrentUser(user);
        navigate("/");
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        err = error.message;
      });

      return err;
  };

  const logOut = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        signInPopup,
        currentUser,
        loading,
        logOut,
        role,
        SignUpWithEmailAndPassword,
        signInEmailPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
