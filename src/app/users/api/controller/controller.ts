import { DataAccess } from "../data-access/data-access";
import { User } from "../data-access/model";

export class Controller{
    private dataAccess: DataAccess

    constructor(dataAccess: DataAccess){
        this.dataAccess = dataAccess
    }

    public addNew = async(data: User): Promise<Response> =>{
        const exisitngUser = await this.dataAccess.findByEmail(data.email)

        if(exisitngUser){
            return Response.json('The email has already been taken', { status: 409, })

        } else{
            const newUser = await this.dataAccess.createNew(data)
            
            return Response.json(newUser, { status: 201,
                headers: {
                    'Content-Type': 'application/json',
                    'Location': `/users/${newUser.id}`
                }
            })
        }
    }

    public getOne = async(userId: string): Promise<Response> =>{
        const user = await this.dataAccess.findById(userId)
        
        if(!user){
            return Response.json('Not Found', { status: 404 })
        } else {
            return Response.json(user, {status: 200})
        }
    }

    public getMany = async(pagination: Paginator): Promise<Response> =>{
        const users = await this.dataAccess.findMany(pagination)

        return Response.json(users, { status: 200 })
    }

    public updateOne = async(userId: string, updateDoc: User): Promise<Response> =>{
        const updatedUser = await this.dataAccess.findByIdAndUpdate(userId, updateDoc)

        if(updatedUser){
            return Response.json('Created',{ status: 200,
                headers: { 'Location':`/users/${updatedUser.id}` }
            })

        } else{
            return this.addNew(updateDoc)
        }
    }

    public modifyOne = async(id: string, updateDoc: Object): Promise<Response> =>{
        const updatedUser = await this.dataAccess.findByIdAndUpdate(id, updateDoc)

        if(updatedUser)
            return Response.json('Modified', { status: 200, 
                headers: { 'Location': `/users/${updatedUser.id}` }
            })
        
        return Response.json('Not Found',{ status: 404 })
        
    }

    public deleteOne = async(id: string): Promise<Response> =>{
        const deletedDoc = await this.dataAccess.findByIdAndDelete(id)

        if(Boolean(deletedDoc))
            return Response.json(deletedDoc, { status: 200 })
        
        else
            return Response.json('Not Found', { status: 404 })
    }
}

export type Paginator = {
    limit: number,
    skip: number
}