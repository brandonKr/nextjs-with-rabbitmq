import React from "react";
import Link from "next/link";

export default function RootLayOut({ children }) {
    return (
        <div>
            <h7><Link href="/">메인으로 가기</Link></h7>
            {children}
            <h7>메인 레이아웃 푸터 테스트 확인용</h7>
        </div>
    );
}