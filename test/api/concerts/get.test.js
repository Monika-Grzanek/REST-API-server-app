const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
const server = require('./../../../server.js');
const Concert = require('./../../../models/concert.model.js');

describe('GET/api/concerts', () => {
    before(async () => {
        const testConOne = new Concert({ _id: "6239bf330e64d2b35af56ca1", performer: "Perform1", genre: "Rock", price: 25, day: 1, image: "/img/uploads/1fsd324fsdy.jpg"});
        await testConOne.save();
        
        const testConTwo = new Concert({ _id: "6239bf720e64d2b35af56ca2", performer: "Perform2", genre: "Pop", price: 30, day: 2, image: "/img/uploads/1fsd324fssg.jpg"});
        await testConTwo.save();

        const testConThree = new Concert({ _id: "6239bfcb0e64d2b35af56ca3", performer: "Perform3", genre: "Jazz", price: 50, day: 3, image: "/img/uploads/1fsd324fsee.jpg"})
        await testConThree.save();

        const testConFour = new Concert({ _id: "6239bfcb0e64d2b35af56ca4", performer: "Perform1", genre: "Rock", price: 20, day: 1, image: "/img/uploads/1fsd324faay.jpg"})
        await testConFour.save();
    });

    it('/ should return all concerts', async () => {
        const res = await request(server).get('/api/concerts');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(4);
    });

    it('/:id should return one concert by :id', async () => {
        const res = await request(server).get('/api/concerts/6239bf330e64d2b35af56ca1');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
    });

    it('/random should return one random concert', async () => {
        const res = await request(server).get('/api/concerts/random');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
    });

    it('/performer/:performer should return a concerts by a specific performer', async () => {
        const res = await request(server).get('/api/concerts/performer/Perform1');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });

    it('/genre/:genre should return a concerts in the selected genre', async () => {
        const res = await request(server).get('/api/concerts/genre/Rock');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });

    it('/price/:price_min/:price_max should return a concerts from a selected price range', async () => {
        const res = await request(server).get('/api/concerts/price/20/30');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(3);
    });

    it('/day/:day should return a concerts of the selected day', async () => {
        const res = await request(server).get('/api/concerts/day/1');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    })

    after(async () => {
        await Concert.deleteMany();
    });
})