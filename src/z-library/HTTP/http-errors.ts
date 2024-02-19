import { NextResponse } from "next/server"

export const handleServerErrors = () =>{
    return new NextResponse(JSON.stringify('Unexpected Error Occured'), {
        status: 500,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}