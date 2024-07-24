const request = require('supertest');
const app = require('../app');

describe('GET /', () => {
    let server;
    beforeAll(() => { server = app.listen(2020)});
    afterAll(() => { server.close()});

    it('responds with 200', (done) => {
        request(app)
            .get('/')
            .expect(200, done);
    });
});
