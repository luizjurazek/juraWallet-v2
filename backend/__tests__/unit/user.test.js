const request = require('supertest')
const app = require('../../server')
const User = require('../../models/userModel')

describe('Teste all routes off users', () => {
    it('should return status code 201 when create user', async () => {
        const res = await request(app)
            .post('/users/create-new-user')
            .send({
                name: 'testando',
                lastname: 'testando',
                phonenumber: '(44)98421-1475',
                email: 'emailteste@gmail.com',
                password: 'passworD23',
                birthday: '2002-03-23'
            })

        expect(res.status).toBe(201)
    })
})

User.destroy({where: {
    email_user: 'emailteste@gmail.com'
}})