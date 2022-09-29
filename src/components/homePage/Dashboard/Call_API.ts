import { collection, onSnapshot, query, Timestamp, where } from "firebase/firestore";
import { db } from "../../../config/db";

function getStartOfToday() {
    const now = new Date()
    now.setHours(5, 0, 0, 0) // +5 hours for Eastern Time
    const timestamp = Timestamp.fromDate(now)
    return timestamp // ex. 1631246400
  }
  

export const getDashboardData = async (money: any, setMoney: any, setOrderToday: any) => {
    // this is snapshort (real time change)
    const q = query(collection(db, "order"), where("date", ">", getStartOfToday()));
    onSnapshot(q, (querySnapshot) => {
        let todayMoney:number = 0;
        let todayOrder:any = [];
        querySnapshot.forEach((doc) => {
            todayMoney+=doc.data().price;
            todayOrder.push(doc.data());
        });
        setMoney({...money, today: todayMoney});
        setOrderToday(todayOrder);
    });
    
}