import { NextResponse } from "next/server";
import { DataAccess } from "../data-access/data-access";
import { User } from "../data-access/model";

export class Controller{
    private dataAccess: DataAccess

    constructor(dataAccess: DataAccess){
        this.dataAccess = dataAccess
    }

    public addNew = async(data: User): Promise<NextResponse> =>{
        const exisitngUser = await this.dataAccess.findByEmail(data.email)

        if(exisitngUser){
            return new NextResponse(null, {
                status: 409,
                headers:{
                    'Content-Type': 'application/json'
                }
            })
        } else{
            const newUser = await this.dataAccess.createNew(data)
            
            return new NextResponse(JSON.stringify(newUser), {
                status: 201,
                headers: {
                    'Content-Type': 'application/json',
                    'Location': `/users/${newUser.id}`
                }
            })
        }
    }
}