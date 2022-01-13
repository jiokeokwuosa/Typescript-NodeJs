import chai from "chai";
import chaiHttp from "chai-http";
import Sinonchai from "sinon-chai";
import sinon from "sinon";
import app from "../index";
import StarShipController from './../controllers/starShip.controller';

chai.should();
chai.use(Sinonchai);
chai.use(chaiHttp);
const { expect } = chai;

const starShipInfo = [{ uid: 12, name: 'test', url: 'dummy', count: 0 }, { uid: 12, name: 'test', url: 'dummy', count: 0 }]

describe("No Matching Endpoint", () => {
    describe("* Unknown ", () => {
        it("should throw 404 error when endpoint is not found", (done) => {
            chai
                .request(app)
                .post("/api/v1/auth/none")
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});

describe("POST /api/v1/starShip/", () => {     
    it("should store starship informations", (done) => {
        chai
            .request(app)
            .post("/api/v1/starShip/")
            .send(starShipInfo)
            .end((err, res) => {
                res.body.should.be.an("object");
                res.body.should.have.property("status").eql("success");
                res.body.should.have.property("data");
                done();
            });
    });
    it("should get all starship informations", (done) => {
        chai
            .request(app)
            .get("/api/v1/starShip/")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an("object");
                res.body.should.have.property("status").eql("success");
                res.body.should.have.property("data");
                done();
            });
    });
    it("should increase the count of the starship when clicked", (done) => {
        chai
            .request(app)
            .patch("/api/v1/starShip/12")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an("object");
                res.body.should.have.property("status").eql("success");
                res.body.should.have.property("data");
                done();
            });
    });
    it("should delete all starships", (done) => {
        chai
            .request(app)
            .delete("/api/v1/starShip/")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an("object");
                res.body.should.have.property("status").eql("success");
                res.body.should.have.property("data");
                done();
            });
    });
    it("Should fake server error for adding starship", (done) => {
        const req = { body: {} };
        const res = {
            status() { },
            send() { },
        };
        sinon.stub(res, "status").returnsThis();
        StarShipController.addStarShip(req, res);
        res.status.should.have.callCount(0);
        done();
    });
    it("Should fake server error for updating count", (done) => {
        const req = { body: {} };
        const res = {
            status() { },
            send() { },
        };
        sinon.stub(res, "status").returnsThis();
        StarShipController.updateStarShipCount(req, res);
        res.status.should.have.callCount(1);
        done();
    });
    it("Should fake server error for getting starships", (done) => {
        const req = { body: {} };
        const res = {
            status() { },
            send() { },
        };
        sinon.stub(res, "status").returnsThis();
        StarShipController.updateStarShipCount(req, res);
        res.status.should.have.callCount(1);
        done();
    });   
    it("Should fake server error for delecting starships", (done) => {
        const req = { body: {} };
        const res = {
            status() { },
            send() { },
        };
        sinon.stub(res, "status").returnsThis();
        StarShipController.deleteStarShips(req, res);
        res.status.should.have.callCount(0);
        done();
    });
});