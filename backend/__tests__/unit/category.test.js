const request = require('supertest');
const app = require('../../server');
const CategoryModel = require('../../models/categoryModel');
require('dotenv').config();

// Utils
const generateUserLogin = require('../helpers/generateUserLogin');
const generateRandomString = require('../helpers/generateRandomString');

describe('Test all endpoints for Category model', () => {
	let userLogged;
	let categoryId;

	beforeEach(async () => {
		userLogged = await generateUserLogin();
		const category = await CategoryModel.findOne({
			where: { id_user: userLogged.body.user_id },
		});
		categoryId = category.id;
	});

	// endpoint to create a category /category/create-category
	it('should return 201 when category is created', async () => {
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

	it('should return 400 when category already exists', async () => {
		const firstTry = await request(app)
			.post('/category/create-category')
			.send({
				category_name: 'Category already existes',
			})
			.set('Authorization', userLogged.body.token)
			.set('userId', userLogged.body.user_id);

		const secondTry = await request(app)
			.post('/category/create-category')
			.send({
				category_name: 'Category already existes',
			})
			.set('Authorization', userLogged.body.token)
			.set('userId', userLogged.body.user_id);

		expect(secondTry.body).toHaveProperty('error');
		expect(secondTry.body).toHaveProperty('message');
		expect(secondTry.status).toBe(400);
	});

	it('should return 400 when on create category a foreign key is missing or wrong', async () => {
		const fakeId = Math.random() * 100;

		const res = await request(app)
			.post('/category/create-category')
			.send({
				category_name: 'Category already existes',
			})
			.set('Authorization', userLogged.body.token)
			.set('userId', fakeId);
	});


	// endpoint to get all categories /category/get-all-categories
	it('should return 200 and all categories', async () => {
		const res = await request(app)
			.get('/category/get-all-categories')
			.set('Authorization', userLogged.body.token)
			.set('userId', userLogged.body.user_id);

		expect(res.body).toHaveProperty('error');
		expect(res.body).toHaveProperty('message');
		expect(res.body).toHaveProperty('categories');
		expect(res.status).toBe(200);
	});
	it('should return 200 and one category', async () => {
		const res = await request(app)
			.get(`/category/get-category-by-id/${categoryId}`)
			.set('Authorization', userLogged.body.token)
			.set('userId', userLogged.body.user_id);

		expect(res.body).toHaveProperty('error');
		expect(res.body).toHaveProperty('message');
		expect(res.body).toHaveProperty('category');
		expect(res.status).toBe(200);
	});
});
