const request = require('supertest')
const app = require('../../server')
const User = require('../../models/userModel')

const userTest = {
    name: 'user-teste',
    lastname: 'teste',
    phonenumber: '(99)98475-1232',
    email: 'teste@gmail.com',
    password: 'admin123456TESTE',
    birthday: '2000-03-21'
}

describe('Teste all endpoints for model User', () => {
    // Test endpoint to create a user
    it('should return status code 400 when any field is empty', async () => {
        const res = await request(app)
            .post('/users/create-new-user')
            .send({
                name: '',
                lastname: userTest.lastname,
                phonenumber: userTest.phonenumber,
                email: userTest.email,
                password: userTest.password,
                birthday: userTest.birthday
            })
        expect(res.status).toBe(400)
    })

    it('should return status code 400 when phonenumber is out of pattern (xx)xxxxx-xxxx', async () => {
        const res = await request(app)
            .post('/users/create-new-user')
            .send({
                name: userTest.name,
                lastname: userTest.lastname,
                phonenumber: '(99)9876-976',
                email: userTest.email,
                password: userTest.password,
                birthday: userTest.birthday
            })
        expect(res.status).toBe(400)
    })

    it('should return status code 400 when email is out of pattern exemplo@mail.com', async () => {
        const res = await request(app)
            .post('/users/create-new-user')
            .send({
                name: userTest.name,
                lastname: userTest.lastname,
                phonenumber: userTest.phonenumber,
                email: 'teste.com.br',
                password: userTest.password,
                birthday: userTest.birthday
            })
        expect(res.status).toBe(400)
    })

    it('should return status code 400 when birthday is out of pattern yyyy-mm-dd', async () => {
        const res = await request(app)
            .post('/users/create-new-user')
            .send({
                name: userTest.name,
                lastname: userTest.lastname,
                phonenumber: userTest.phonenumber,
                email: userTest.email,
                password: userTest.password,
                birthday: '25-03-2008'
            })
        expect(res.status).toBe(400)
    })

    it('should return status code 400 when password is out of pattern, must have a number, a Lower and Upper case letter and have more than 8 characters', async () => {
        const res = await request(app)
            .post('/users/create-new-user')
            .send({
                name: userTest.name,
                lastname: userTest.lastname,
                phonenumber: userTest.phonenumber,
                email: userTest.email,
                password: '123',
                birthday: userTest.birthday
            })
        expect(res.status).toBe(400)
    })

    it('should return status code 201 when create user', async () => {
        const res = await request(app)
            .post('/users/create-new-user')
            .send({
                name: userTest.name,
                lastname: userTest.lastname,
                phonenumber: userTest.phonenumber,
                email: userTest.email,
                password: userTest.password,
                birthday: userTest.birthday
            })
        expect(res.status).toBe(201)
    })

    it('should return status code 400 when email already in use', async () => {
        const res = await request(app)
            .post('/users/create-new-user')
            .send({
                name: userTest.name,
                lastname: userTest.lastname,
                phonenumber: userTest.phonenumber,
                email: userTest.email,
                password: userTest.password,
                birthday: userTest.birthday
            })
        expect(res.status).toBe(400)
    })
})

User.destroy({where: {
    email_user: 'emailteste@gmail.com'
}})