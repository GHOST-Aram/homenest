import { controller } from './test.config';
import { describe, test, expect } from '@jest/globals'
import { EXISTING_USER_ID, userData } from "./test.data";

describe('Update One Controller', () =>{

    test('Responds with updated resource url, status: 200', 
        async() =>{
            const response = await controller.updateOne(EXISTING_USER_ID, userData)
            
            expect(response.status).toEqual(200)
            expect(response.headers.get('Content-Type')).toMatch(/json/)
            expect(response.headers.get('Location')).toMatch(/\/users\/[a-f0-9]/i)
        }
    )
})