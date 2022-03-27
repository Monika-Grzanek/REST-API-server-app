const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
const server = require('./../../../server.js');
const Concert = require('./../../../models/concert.model.js');

describe('DELETE/api/concerts', () => {
    before(async () => {
        const testConOne = new Concert({ _id: "6239bf330e64d2b35af56ca1", performer: "Perform1", genre: "Rock", price: 25, day: 1, image: "/img/uploads/1fsd324fsdy.jpg"});
        await testConOne.save();
    });

    it('/:id should removed concert', async () => {
        const res = await request(server).delete('/api/concerts/6239bf330e64d2b35af56ca1');
        const removedConcert = await Concert.findOne({ _id: "6239bf330e64d2b35af56ca1" });
        expect(res.status).to.be.equal(200);
        expect(removedConcert).to.be.null;
    })

    after(async () => {
        await Concert.deleteMany();
    });
    
})