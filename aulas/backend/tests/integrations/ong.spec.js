const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');



describe('', () => {
    
    beforeEach(async ()=>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    })
    
    afterAll(async()=>{
        await connection.destroy();
    })

    it('Verificando se é possivel criar uma ong', async ()=>{
        const response = await request(app).post('/ongs').send({
            name:"Ong Teste",
            email: "ong@com.br",
            whatsapp:"12345678945",
            city:"rio de Janeiro",	
            uf:"RJ"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })
})