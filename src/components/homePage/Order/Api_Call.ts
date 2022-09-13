import { addDoc, collection, deleteDoc, doc, getDocs, limit, onSnapshot, query, Timestamp, updateDoc, where } from 'firebase/firestore';
import { db } from "../../../config/db";
import { CartInterface } from './Interface';

export const getAllOrders = async (setOrders: any, setLoading: any) => {
    // this is snapshort (real time change)
    setLoading(true);
    const q = query(collection(db, "order"));
    onSnapshot(q, (querySnapshot) => {
        const data: any = [];
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
        });
        setOrders(data);
        setLoading(false);
    });
}

export const addToCart = async ({ food, food_id, image_url, image_path, price, user_id }: CartInterface, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        setLoading(true);
        const q = query(collection(db, "cart"), where("food_id", "==", food_id), where("user_id", "==", user_id), limit(1));
        const querySnapshot = await getDocs(q);
        let cart: any = null;
        querySnapshot.forEach((doc) => {
            return cart = { ...doc.data(), id: doc.id };
        });

        if (cart) {
            try {
                const cartRef = doc(db, "cart", cart.id);
                await updateDoc(cartRef, {
                    quantity: cart.quantity + 1,
                });

            } catch (error) {

                console.log(error)

            }

        } else {
            try {
                await addDoc(collection(db, "cart"), {
                    food,
                    food_id,
                    image_url,
                    image_path,
                    price,
                    user_id,
                    quantity: 1,
                    created_at: Timestamp.now(),
                });

            } catch (error) {
                console.log(error);
            }
        }
        setLoading(false);
    } catch (error) {
        console.log(error);
    }
}

export const getOneOrder = async (id: string, setOrder: any) => {
    onSnapshot(doc(db, "order", id), (doc) => {
        setOrder({ ...doc.data(), id: doc.id })
    });

}

export const makeOrderDone = async (id: string) => {
    try {
        const orderRef = doc(db, "order", id);
        await updateDoc(orderRef, {
            status: true,
        })
    } catch (error) {
        console.log(error)
    }

}

export const deleteOrder = async (id: string) => {
    try {
        const orderRef = doc(db, "order", id);
        await deleteDoc(orderRef);
    } catch (error) {
        console.log(error)
    }
}

export const orderFood = async (
    table: string,
    customer: string | undefined | null,
    email: string | undefined | null,
    price: number,
    foods: any,
    setLoading: any
) => {

    setLoading(true);
    try {
        await addDoc(collection(db, "order"), {
            table,
            customer,
            email,
            price,
            foods,
            status: false,
            date: Timestamp.now(),
        }).then(() => {
            foods.map(async (food: any) => {
                try {
                    const orderRef = doc(db, "cart", food.id);
                    await deleteDoc(orderRef);
                } catch (error) {
                    console.log(error)
                }
            })
        });

    } catch (error) {
        console.log(error);
    }
    setLoading(false);

}