import { controller } from './test.config';
import { describe, test, expect } from '@jest/globals'
import { EXISTING_USER_ID,NOT_EXIST_USER_ID, userData } from "./test.data";

describe('Patch Request Controller', () =>{

    test('Responds with modified resource url, status: 200', 
        async() =>{
            const response = await controller.modifyOne(EXISTING_USER_ID, userData)
            
            expect(response.status).toEqual(200)
            expect(response.headers.get('Content-Type')).toMatch(/json/)
            expect(response.headers.get('Location')).toMatch(/\/users\/[a-f0-9]/i)
        }
    )

    test('Responds with not found, status 404: Target document not found', 
        async() => {
            const response = await controller.modifyOne(NOT_EXIST_USER_ID, userData)
            
            expect(response.status).toEqual(404)
            expect(response.headers.get('Content-Type')).toMatch(/json/)
        }
    )
})