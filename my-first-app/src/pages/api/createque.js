import { sendNotification } from "@/amq/amqSendQue";
import { NextRequest, NextResponse } from 'next/server'

export default async function handler(NextRequest, NextResponse) {
    //쿼리스트링으로 데이터 수신
    const title = NextRequest.query.title;
    //바디로 데이터 수신
    const body = NextRequest.body;

    await createQueue(title, body).then(()=>{
        NextResponse.status(200).json({ message: 'success' });
    });
}

export async function createQueue(title, body){
    // sendNotification({
    //     cmd: "/api/2/post/lift/orders/mission/new",
    //     title: title,
    //     description: "새로운 주문이 생성되었습니다.",
    //     noti: "이거슨 데이터입니다."
    // });
    sendNotification(body);
}
