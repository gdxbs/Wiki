const request = require('supertest');
const app = require('../app');


//Test for GET /links
describe('GET /workshop', () => {
    let server;
    beforeAll(() => { server = app.listen(2020)});
    afterAll(() => { server.close()});

    it('responds with the Workshop HTML file', async () => {
        const response = await request(app).get('/links/workshop');
        expect(response.status).toBe(200); // Check if the response status is 200 (OK)
        expect(response.type).toBe('text/html'); // Check if the response type is HTML
      });
});

describe('GET /about', () => {
    let server;
    beforeAll(() => { server = app.listen(2020)});
    afterAll(() => { server.close()});

    it('responds with the About HTML file', async () => {
        const response = await request(app).get('/links/about');
        expect(response.status).toBe(200); // Check if the response status is 200 (OK)
        expect(response.type).toBe('text/html'); // Check if the response type is HTML
    });
});

describe('GET /aboutuser', () => {
    let server;
    beforeAll(() => { server = app.listen(2020)});
    afterAll(() => { server.close()});

    it('responds with the AboutUser HTML file', async () => {
        const response = await request(app).get('/links/aboutuser');
        expect(response.status).toBe(200); // Check if the response status is 200 (OK)
        expect(response.type).toBe('text/html'); // Check if the response type is HTML
    });
});

describe('GET /menuuser', () => {
    let server;
    beforeAll(() => { server = app.listen(2020)});
    afterAll(() => { server.close()});

    it('responds with the MenuUser HTML file', async () => {
        const response = await request(app).get('/links/menuuser');
        expect(response.status).toBe(200); // Check if the response status is 200 (OK)
        expect(response.type).toBe('text/html'); // Check if the response type is HTML
    });
});

describe('GET /creation', () => {
    let server;
    beforeAll(() => { server = app.listen(2020)});
    afterAll(() => { server.close()});

    it('responds with the ArticleCreation HTML file', async () => {
        const response = await request(app).get('/links/creation');
        expect(response.status).toBe(200); // Check if the response status is 200 (OK)
        expect(response.type).toBe('text/html'); // Check if the response type is HTML
    });
});

describe('GET /edit', () => {
    let server;
    beforeAll(() => { server = app.listen(2020)});
    afterAll(() => { server.close()});

    it('responds with the ArticleEdit HTML file', async () => {
        const response = await request(app).get('/links/edit');
        expect(response.status).toBe(200); // Check if the response status is 200 (OK)
        expect(response.type).toBe('text/html'); // Check if the response type is HTML
    });
});

describe('GET /login', () => {
    let server;
    beforeAll(() => { server = app.listen(2020)});
    afterAll(() => { server.close()});

    it('responds with the Login HTML file', async () => {
        const response = await request(app).get('/links/login');
        expect(response.status).toBe(200); // Check if the response status is 200 (OK)
        expect(response.type).toBe('text/html'); // Check if the response type is HTML
    });
});

describe('GET /menu', () => {
    let server;
    beforeAll(() => { server = app.listen(2020)});
    afterAll(() => { server.close()});

    it('responds with the Menu HTML file', async () => {
        const response = await request(app).get('/links/menu');
        expect(response.status).toBe(200); // Check if the response status is 200 (OK)
        expect(response.type).toBe('text/html'); // Check if the response type is HTML
    });
});

describe('GET /account', () => {
    let server;
    beforeAll(() => { server = app.listen(2020)});
    afterAll(() => { server.close()});

    it('responds with the Account HTML file', async () => {
        const response = await request(app).get('/links/account');
        expect(response.status).toBe(200); // Check if the response status is 200 (OK)
        expect(response.type).toBe('text/html');
    });
});

describe('GET /register', () => {
    let server;
    beforeAll(() => { server = app.listen(2020)});
    afterAll(() => { server.close()});
    
    it('responds with the Register HTML file', async () => {
        const response = await request(app).get('/links/register');
        expect(response.status).toBe(200); // Check if the response status is 200 (OK)
        expect(response.type).toBe('text/html');
    });
});