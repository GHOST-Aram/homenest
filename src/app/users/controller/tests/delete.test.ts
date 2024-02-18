import { controller } from './test.config';
import { describe, test, expect } from '@jest/globals'
import { EXISTING_USER_ID,NOT_EXIST_USER_ID } from "./test.data";

describe('Delete Request Controller', () =>{

    test('Responds with the deleted resource, status: 200', 
        async() =>{
            const response = await controller.deleteOne(EXISTING_USER_ID)
            
            expect(response.status).toEqual(200)
            expect(response.headers.get('Content-Type')).toMatch(/json/)
            expect(await response.json()).toBeTruthy
        }
    )

    test('Responds with not found, status 404: Target document not found', 
        async() => {
            const response = await controller.deleteOne(NOT_EXIST_USER_ID)
            
            expect(response.status).toEqual(404)
            expect(response.headers.get('Content-Type')).toMatch(/json/)
        }
    )
})