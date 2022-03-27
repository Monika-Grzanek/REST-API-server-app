const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
const server = require('./../../../server.js');
const Concert = require('./../../../models/concert.model.js');

describe('POST/api.concerts', () => {
    it('/ should return new concert', async () => {
        const res = await request(server).post('/api/concerts').send({ _id: "6239bf330e64d2b35af56ca1", performer: "Perform1", genre: "Rock", price: 25, day: 1, image: "/img/uploads/1fsd324fsdy.jpg"});
        const newConcert = await Concert.findOne({ _id: "6239bf330e64d2b35af56ca1", performer: "Perform1", genre: "Rock", price: 25, day: 1, image: "/img/uploads/1fsd324fsdy.jpg"});
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
    });

    after(async () => {
        await Concert.deleteMany();
    })
})