import { ObjectSchema, ValidationError } from "joi";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";

class Validator {
   

    public validateUserInput = (userData: Object,  validationSchema: ObjectSchema): ValidationError | undefined =>{
        const { error }  = validationSchema.validate(userData,{ abortEarly: false})
        return error
    }

    public validateReferenceId = (id: string) =>{
        if(isValidObjectId(id))
            return
        throw new Error('Invalid reference id. Id must be a hexadecimal string of length 24.')
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

export const validator  = new Validator()