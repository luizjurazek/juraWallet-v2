const request = require('supertest');
const app = require('../../server');

const userTest = {
	name: 'user-teste',
	lastname: 'teste',
	phonenumber: '(99)98475-1232',
	email: 'teste@gmail.com',
	password: 'admin123456TESTE',
	birthday: '2000-03-21',
};

describe('Teste all endpoints for model User', () => {
	//Do tests for endpoint to create a user
	it('should return status code 400 when any field is empty', async () => {
		const res = await request(app).post('/users/create-new-user').send({
			name: '',
			lastname: userTest.lastname,
			phonenumber: userTest.phonenumber,
			email: userTest.email,
			password: userTest.password,
			birthday: userTest.birthday,
		});
		expect(res.status).toBe(400);
	});

	it('should return status code 400 when phonenumber is out of pattern (xx)xxxxx-xxxx', async () => {
		const res = await request(app).post('/users/create-new-user').send({
			name: userTest.name,
			lastname: userTest.lastname,
			phonenumber: '(99)9876-976',
			email: userTest.email,
			password: userTest.password,
			birthday: userTest.birthday,
		});
		expect(res.status).toBe(400);
	});

	it('should return status code 400 when email is out of pattern exemplo@mail.com', async () => {
		const res = await request(app).post('/users/create-new-user').send({
			name: userTest.name,
			lastname: userTest.lastname,
			phonenumber: userTest.phonenumber,
			email: 'teste.com.br',
			password: userTest.password,
			birthday: userTest.birthday,
		});
		expect(res.status).toBe(400);
	});

	it('should return status code 400 when birthday is out of pattern yyyy-mm-dd', async () => {
		const res = await request(app).post('/users/create-new-user').send({
			name: userTest.name,
			lastname: userTest.lastname,
			phonenumber: userTest.phonenumber,
			email: userTest.email,
			password: userTest.password,
			birthday: '25-03-2008',
		});
		expect(res.status).toBe(400);
	});

	it('should return status code 400 when password is out of pattern, must have a number, a Lower and Upper case letter and have more than 8 characters', async () => {
		const res = await request(app).post('/users/create-new-user').send({
			name: userTest.name,
			lastname: userTest.lastname,
			phonenumber: userTest.phonenumber,
			email: userTest.email,
			password: '123',
			birthday: userTest.birthday,
		});
		expect(res.status).toBe(400);
	});

	it('should return status code 201 when create user', async () => {
		const res = await request(app).post('/users/create-new-user').send({
			name: userTest.name,
			lastname: userTest.lastname,
			phonenumber: userTest.phonenumber,
			email: userTest.email,
			password: userTest.password,
			birthday: userTest.birthday,
		});
		expect(res.status).toBe(201);
	});

	it('should return status code 400 when email already in use', async () => {
		const res = await request(app).post('/users/create-new-user').send({
			name: userTest.name,
			lastname: userTest.lastname,
			phonenumber: userTest.phonenumber,
			email: userTest.email,
			password: userTest.password,
			birthday: userTest.birthday,
		});
		expect(res.status).toBe(400);
	});

	//Do tests for endpoint to login
	it('should return status code 404 if user is not found', async () => {
		const res = await request(app).post('/users/login').send({
			email: 'email@errado.com',
			password: userTest.password
		});
		expect(res.status).toBe(404);
	});

	it('should return status code 403 if password is wrong', async () => {
		const res = await request(app).post('/users/login').send({
			email: userTest.email,
			password: 'password-wrong'
		});
		expect(res.status).toBe(403);
	});

	it('should return status code 200 if all data is rigth and user can be allowed', async () => {
		const res = await request(app).post('/users/login').send({
			email: userTest.email,
			password: userTest.password
		});
		expect(res.status).toBe(200);
	});

	it('should return status code 200 if user deleted succesfully', async () => {
		const loginResponse = await request(app).post('/users/login').send({
			email: userTest.email,
			password: userTest.password
		});

		// Extrair o token e o userId de autenticação do loginResponse
		const token = loginResponse.body.token;
		const userId = loginResponse.body.user_id;

		const res = await request(app)
			.delete('/users/delete-account')
			.set('Authorization', token)
			.set('userId', userId);

		expect(res.status).toBe(200);
	});
});
