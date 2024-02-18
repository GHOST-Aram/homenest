import { NextResponse } from "next/server"

export const handleServerErrors = (error: any) =>{
    return new NextResponse(JSON.stringify(error.message), {
        status: 500,
        headers: {
            'Content-Type': 'application/json'
        }
    })
}