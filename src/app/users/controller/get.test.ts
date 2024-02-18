import { controller } from './test.config';
import { describe, test, expect } from '@jest/globals'

describe('GET route handler (GET One)', () =>{
    test('Responds with Not found, status 404: target user not found',
        async() => {
            const response = await controller.getOne('64c9e4f2df7cc072af2ac9e8')

            expect(response.status).toEqual(404)
            expect(response.headers.get('Content-Type')).toMatch(/json/)
        }
    )
}
)