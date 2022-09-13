import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../../config/db";

export const getNotification = (email: string | null | undefined, setNotice: any, ) => {

    const q = query(collection(db, "order"), where("email", "==", email), where("status", "==", false));
    onSnapshot(q, (querySnapshot) => {
        const data: any = [];
        querySnapshot.forEach((doc) => {
            data.push(doc);
        });
        setNotice(data.length);
    });

}