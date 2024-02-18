import DataAccess  from "../data-access/mock-data-access";
import { User } from "../data-access/model";
import { Controller } from "./controller";
import { describe, test, expect } from '@jest/globals'
import { existingUser } from "./test.data";

const dataAccess = new DataAccess(User)
const controller = new Controller(dataAccess)


describe('POST Route handler', () => {

    test('Responds with Conflict, status code 409: Document already exists with the provided', 
        async() =>{
            const response = await controller.addNew(existingUser)

            expect(response.status).toEqual(409)
            expect(response.headers.get('Content-Type')).toMatch(/json/)
        }
    )
})


