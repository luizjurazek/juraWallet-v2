const request = require('supertest');
const app = require('../../server');
require('dotenv').config();

async function generateUserLogin(email, password){
  const userLogged = await request(app).post('/users/login').send({
    email: email || process.env.DB_TEST_USER_EMAIL,
    password: password || process.env.DB_TEST_USER_PASSWORD
  });
  
  return userLogged
}

module.exports = generateUserLogin

