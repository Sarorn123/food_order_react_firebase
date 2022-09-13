import { collection, deleteDoc, doc, getDocs, limit, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../../../config/db";

export const getAllCarts = (setCarts: any, setLoading: any, setTotal: any, user_id: string | undefined) => {
    const q = query(collection(db, "cart"), where("user_id", "==", user_id));
    onSnapshot(q, (querySnapshot) => {
        const data: any = [];
        let total: number = 0;
        querySnapshot.forEach((doc) => {
            total += doc.data()?.price * doc.data()?.quantity;
            data.push({ ...doc.data(), id: doc.id });
        });
        setCarts(data);
        setTotal(total);
        setLoading(false);
    });
}

export const updateQuantity = async (type: boolean, food_id: string, user_id: string | undefined, setUpdateQuantityLoading: any, cart_id: string) => {
    setUpdateQuantityLoading(true);
    const q = query(collection(db, "cart"), where("food_id", "==", food_id), where("user_id", "==", user_id), limit(1));
    const querySnapshot = await getDocs(q);
    let cart: any = null;
    if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
            return cart = { ...doc.data(), id: doc.id };
        });
    }
    if (type) {
        try {
            const cartRef = doc(db, "cart", cart.id);
            await updateDoc(cartRef, {
                quantity: cart.quantity + 1,
            })

        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            if (cart.quantity === 1) {
                await deleteDoc(doc(db, "cart", cart_id));
            } else {
                const cartRef = doc(db, "cart", cart.id);
                await updateDoc(cartRef, {
                    quantity: cart.quantity - 1,
                });
            }
        } catch (error) {
            console.log(error)
        }

    }
    setUpdateQuantityLoading(false);

}

export const checkIfExistInCart = async (food_id: string, user_id: string | undefined, setCarted: any) => {
    const q = query(collection(db, "cart"), where("food_id", "==", food_id), where("user_id", "==", user_id), limit(1));
    onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
            setCarted(true);
        } else {
            setCarted(false);
        }
    });

}