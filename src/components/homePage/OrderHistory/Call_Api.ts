import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../config/db';

export const getAllOrdersHistory = (email: string | null | undefined , setOrders: any, setLoading: any) => {
    const q = query(collection(db, "order"), where('email', "==", email));
    onSnapshot(q, (querySnapshot) => {
        const data: any = [];
        querySnapshot.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
        });
        setOrders(data);
        setLoading(false);
    });
}