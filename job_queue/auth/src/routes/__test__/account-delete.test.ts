import request from 'supertest';
import { app } from '../../app';

it('check account delete', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);

  await request(app)
    .post('/api/users/delete')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(400);
});
