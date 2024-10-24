import React from "react";

export default function RootLayOut({ children }) {
    return (
        <div>
            <h1>반갑습니다.</h1>
            {children}
        </div>
    );
}