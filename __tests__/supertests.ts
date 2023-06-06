const server = 'http://localhost:3001';
const supertest = require('supertest')
const request = supertest(server)

describe('Server Unit tests', () => {

    describe('catchAll route', () => {
        it ('responds with status 404 when route is not found', async () => {
            const response = await request.get('/invalid');
            console.log(response)
            expect(response.statusCode).toBe(404);
        })
    });

})