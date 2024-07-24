const request = require('supertest');
const app = require('../app');


describe('POST /', () => {
    let server;
    beforeAll(() => { server = app.listen(2020)});
    afterAll(() => { server.close()});

    it('responds with 200', (done) => {
        request(app)
            .post('/article')
            .send({ title: 'Test Article', content: 'This is a test article.' })
            .expect(200, done);
    });
});

describe('GET /article/:article_id', () => {
    let server;
    beforeAll(() => { server = app.listen(2020)});
    afterAll(() => { server.close()});

    it('responds with 200', (done) => {
        request(app)
            .get('/1')
            .expect(200, done);
    });
});