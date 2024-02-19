import { ObjectSchema, ValidationError } from "joi";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

export class Validator {
    private validationSchema: ObjectSchema

    constructor(schema: ObjectSchema){
        this.validationSchema = schema
    }

    public validateUserInput = (userData: Object): ValidationError | undefined =>{
        const { error }  = this.validationSchema.validate(userData,{ abortEarly: false})
        return error
    }

    
    public handleValidationErrors = (errors: ValidationError): NextResponse =>{
        
        return new NextResponse(JSON.stringify(errors), {
            status: 400,
            headers: {
                'Content-Types': 'application/json'
            }
        })
    }
}
export const validateReferenceId = (id: string) =>{
    if(isValidObjectId(id))
        return
    throw new Error('Invalid reference id. Id must be a hexadecimal string of length 24.')
}