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
            return new NextResponse(null, { status: 409,
                headers:{ 'Content-Type': 'application/json' }
            })

        } else{
            const newUser = await this.dataAccess.createNew(data)
            
            return new NextResponse(JSON.stringify(newUser), { status: 201,
                headers: {
                    'Content-Type': 'application/json',
                    'Location': `/users/${newUser.id}`
                }
            })
        }
    }

    public getOne = async(userId: string): Promise<NextResponse> =>{
        const user = await this.dataAccess.findById(userId)
        
        if(!user){
            return new NextResponse(null, { status: 404,
                headers:{
                    'Content-Type': 'application/json'
                }
            })
        } else {
            return new NextResponse(JSON.stringify(user), { status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
        }
    }

    public getMany = async(pagination: Paginator): Promise<NextResponse> =>{
        const users = await this.dataAccess.findMany(pagination)

        return new NextResponse(JSON.stringify(users), { status: 200,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    public updateOne = async(userId: string, updateDoc: User): Promise<NextResponse> =>{
        const updatedUser = await this.dataAccess.findByIdAndUpdate(userId, updateDoc)

        if(updatedUser){
            return new NextResponse(null,{ status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Location':`/users/${updatedUser.id}`
                }
            })

        } else{
            return this.addNew(updateDoc)
        }
    }

    public modifyOne = async(id: string, updateDoc: Object): Promise<NextResponse> =>{
        const updatedUser = await this.dataAccess.findByIdAndUpdate(id, updateDoc)

        if(updatedUser)
            return new NextResponse(null, { status: 200, 
                headers: {
                    'Content-Type': 'application/json',
                    'Location': `/users/${updatedUser.id}`
                }
            })
        
        return new NextResponse(null,{ status: 404,
                headers: { 'Content-Type': 'application/json',}})
        
    }

    public deleteOne = async(id: string): Promise<NextResponse> =>{
        const deletedDoc = await this.dataAccess.findByIdAndDelete(id)

        if(Boolean(deletedDoc))
            return new NextResponse(JSON.stringify(deletedDoc), { 
                status: 200,
                headers:{
                    'Content-Type': 'application/json'
                }
            })
        
        else
            return new NextResponse(null, { status: 404,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    }
}

export type Paginator = {
    limit: number,
    skip: number
}