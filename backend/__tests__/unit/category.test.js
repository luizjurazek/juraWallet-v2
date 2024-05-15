const request = require('supertest');
const app = require('../../server');
require('dotenv').config();

// Utils
const generateUserLogin = require('../helpers/generateUserLogin');
const generateRandomString = require('../helpers/generateRandomString');

describe('Test all endpoints for Category model', () => {
	it('should return 201 when category is created', async () => {
		const userLogged = await generateUserLogin();

		const res = await request(app)
			.post('/category/create-category')
			.send({
				category_name: generateRandomString(10),
			})
			.set('Authorization', userLogged.body.token)
			.set('userId', userLogged.body.user_id);

		expect(res.body).toHaveProperty('error');
		expect(res.body).toHaveProperty('message');
		expect(res.body).toHaveProperty('category');
		expect(res.status).toBe(201);
	});

	it('should return 200 and all categories', async () => {
		const userLogged = await generateUserLogin();

		const res = await request(app)
			.get('/category/get-all-categories')
			.set('Authorization', userLogged.body.token)
			.set('userId', userLogged.body.user_id)

		expect(res.body).toHaveProperty('error')
		expect(res.body).toHaveProperty('message')
		expect(res.body).toHaveProperty('categories')
		expect(res.status).toBe(200)
	})
	it('should return 200 and one category', async () => {
		const userLogged = await generateUserLogin();

		const res = await request(app)
			.get(`/category/get-category-by-id/31`)
			.set('Authorization', userLogged.body.token)
			.set('userId', userLogged.body.user_id);

		expect(res.body).toHaveProperty('error')
		expect(res.body).toHaveProperty('message')
		expect(res.body).toHaveProperty('category')
		expect(res.status).toBe(200)
	})
});
