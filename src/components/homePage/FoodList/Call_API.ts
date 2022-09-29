import { collection, getDocs, addDoc, query, where, onSnapshot, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from '../../../config/db';
import { getDownloadURL, ref, uploadBytes, deleteObject } from 'firebase/storage';
import { v4 } from "uuid";
import { storage } from "../../../config/config";
import { FoodInterface } from './interface';

export const getAllFoods = async (setFoods: React.Dispatch<React.SetStateAction<FoodInterface[]>>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    // this is snapshort (real time change)
    const q = query(collection(db, "food"));
    onSnapshot(q, (querySnapshot) => {
        const data: any = [];
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
        });
        setFoods(data);
        setLoading(false);
    });
}

export const addFood = async (name: string, price: string, image: any, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        setLoading(true);
        const image_path = `images/${image.name + v4()}`;
        const imageRef = ref(storage, image_path);
        uploadBytes(imageRef, image).then(() => {
            getDownloadURL(imageRef).then(async (url) => {
                await addDoc(collection(db, "food"), {
                    name: name,
                    price: price,
                    image_url: url,
                    image_path: image_path,
                });
                setLoading(false);
            });
        });

    } catch (error) {
        console.log(error);
    }
}

export const getWhere = async () => {
    const q = query(
        collection(db, "user_info"),
        where("user_id", "==", "dsd")
    );

    const querySnapshot = await getDocs(q);
    const data = querySnapshot.forEach((doc) => {
        return doc.data();
    });
}

export const deleteFood = async (id: string, image_path: string, setLoading: any) => {
    setLoading(true);
    const imageRef = ref(storage, image_path);
    deleteObject(imageRef).then(async () => {
        await deleteDoc(doc(db, "food", id));
    }).catch((error) => {
        console.log(error);
    });


}

export const getFood = async (id: string, setName: any, setPrice: any, setImageURL: any) => {
    // snap short listen 
    onSnapshot(doc(db, "food", id), (doc) => {
        setName(doc.data()?.name);
        setPrice(doc.data()?.price);
        setImageURL(doc.data()?.image_url);
    });
}

export const updateFood = async (name: string, price: string, id: string) => {
    const foodRef = doc(db, "food", id);
    await updateDoc(foodRef, {
        name,
        price,
    });
}