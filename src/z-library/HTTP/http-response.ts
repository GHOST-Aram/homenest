import { HydratedDocument } from "mongoose"

export class HTTPResponse{

    public sendConflictResponse = (message: string): Response =>{
        return Response.json(message, { status: 409, })
    }

    public sendCreatedItemUrl = (url: string): Response =>{
        return Response.json('Created', { status: 201, headers: { 'Location': url } })
    }

    public sendNotFoundResponse = (): Response =>{
        return Response.json('Not Found', { status: 404 })
    }

    public sendFoundItem = (foundDoc: Document | Document[]) : Response =>{
            return Response.json(foundDoc, { status: 200 })
    }

    public sendUpdatedItemUrl = (url: string) =>{
        return Response.json('Updated',{ status: 200,
            headers: { 'Location': url }
        })
    }

    public sendModifedItemUrl = (url: string) =>{
        return Response.json('Modified', { status: 200, 
            headers: { 'Location': url}
        })
    }

    public sendDeletedItem = (deleted: Document) =>{
        return this.sendFoundItem(deleted)
    }
}

type Document = HydratedDocument<Object>