import { ObjectSchema, ValidationError } from "joi";
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