import { HTTPResponse } from "../../../../z-library/HTTP/http-response";
import { DataAccess } from "../data-access/data-access";
import { User } from "../data-access/model";

export class Controller extends HTTPResponse{
    private dataAccess: DataAccess

    constructor(dataAccess: DataAccess){
        super()
        this.dataAccess = dataAccess
    }

    public addNew = async(data: User): Promise<Response> =>{
        const exisitngUser = await this.dataAccess.findByEmail(data.email)

        if(exisitngUser){
            return this.sendConflictResponse('Email has already been taken.')

        } else{
            const newUser = await this.dataAccess.createNew(data)
            return this.sendCreatedItemUrl(`/users/${newUser.id}`)
        }
    }

    public getOne = async(userId: string): Promise<Response> =>{
        const user = await this.dataAccess.findById(userId)
        
        if(!user){
            return this.sendNotFoundResponse()
        } else {
            return this.sendFoundItem(user)
        }
    }

    public getMany = async(pagination: Paginator): Promise<Response> =>{
        const users = await this.dataAccess.findMany(pagination)
        return this.sendFoundItem(users)
    }

    public updateOne = async(userId: string, updateDoc: User): Promise<Response> =>{
        const updatedUser = await this.dataAccess.findByIdAndUpdate(userId, updateDoc)

        if(updatedUser){
           return this.sendUpdatedItemUrl(`/users/${updatedUser.id}` )

        } else{
            return this.addNew(updateDoc)
        }
    }

    public modifyOne = async(id: string, updateDoc: Object): Promise<Response> =>{
        const modifiedUser = await this.dataAccess.findByIdAndUpdate(id, updateDoc)

        if(modifiedUser)
            return this.sendModifedItemUrl(`/users/${modifiedUser.id}` )
        else
            return this.sendNotFoundResponse()
        
    }

    public deleteOne = async(id: string): Promise<Response> =>{
        const deletedDoc = await this.dataAccess.findByIdAndDelete(id)

        if(deletedDoc)
            return this.sendDeletedItem(deletedDoc)
        else
            return this.sendNotFoundResponse()
    }
}

export type Paginator = {
    limit: number,
    skip: number
}