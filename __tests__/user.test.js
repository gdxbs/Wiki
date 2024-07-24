const request = require('supertest');
const app = require('../app');

describe('POST /login', () => {
    let server;
    
    beforeAll(() => {
      server = app.listen(2020);
    });
  
    afterAll(() => {
      server.close();
    });
  
    it('should respond with 200 status code for successful login', async () => {
      const res = await request(app)
        .post('/login') // Replace with your actual login route
        .send({
          username: 'testuser',
          password: 'testpassword',
        });
  
      expect(res.statusCode).toEqual(200);
      // Add more assertions based on your application's logic for successful login
    });
  
    it('should respond with 401 status code for unsuccessful login', async () => {
      const res = await request(app)
        .post('/login') // Replace with your actual login route
        .send({
          username: 'invaliduser',
          password: 'invalidpassword',
        });
  
      expect(res.statusCode).toEqual(401);
      // Add more assertions based on your application's logic for unsuccessful login
    });
  });

describe('POST /register', () => {
    let server;
    beforeAll(() => { server = app.listen(2020)});
    afterAll(() => { server.close()});

    it('should respond with 200 status code', async () => {
        const res = await request(app)
            .post('/user')
            .send({
                username: 'testuser',
                password: 'testpassword'
            });
        expect(res.statusCode).toEqual(200);
    });
});

describe('GET /', () => {
    let server;
    beforeAll(() => { server = app.listen(2020)});
    afterAll(() => { server.close()});

    it('should respond with 200 status code', async () => {
        const res = await request(app).get('/user');
        expect(res.statusCode).toEqual(200);
    });
});
