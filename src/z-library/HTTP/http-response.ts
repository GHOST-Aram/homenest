import { HydratedDocument } from "mongoose"

export class HTTPResponse{
    public sendConflictResponse = (message: string): Response =>{
        return Response.json(message, { status: 409, })
    }

    public sendCreatedItemUrl = (id: string): Response =>{
        return Response.json('Created', { status: 201, headers: { 
                'Location': `/users/${id}`
            }
        })
    }

    public sendNotFoundResponse = (): Response =>{
        return Response.json('Not Found', { status: 404 })
    }

    public sendFoundItem = (foundDoc: Document | Document[]) : Response =>{
            return Response.json(foundDoc, { status: 200 })
    }

    public sendUpdatedItemUrl = (updatedId: string) =>{
        return Response.json('Updated',{ status: 200,
            headers: { 'Location':`/users/${updatedId}` }
        })
    }

    public sendModifedItemUrl = (id: string) =>{
        return Response.json('Modified', { status: 200, 
            headers: { 'Location': `/users/${id}` }
        })
    }

    public sendDeletedItem = (deleted: Document) =>{
        return this.sendFoundItem(deleted)
    }
}

type Document = HydratedDocument<Object>