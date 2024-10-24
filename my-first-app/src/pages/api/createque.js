import { sendNotification } from "@/amq/amqSendQue";

export default async function handler(req, res) {
    await createQueue().then(()=>{
        res.status(200).json({ message: 'success' });
    });
}

export async function createQueue(){
    sendNotification({
        cmd: "/api/2/post/lift/orders/mission/new",
        title: "새 주문 알림",
        description: "새로운 주문이 생성되었습니다.",
        noti: "이거슨 데이터입니다."
    });
}
