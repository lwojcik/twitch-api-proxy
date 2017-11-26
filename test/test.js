'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');

chai.use(chaiHttp);

/*eslint-disable */

describe('App', function() {
    
});

describe('Config', function() {
    it('should return JSON object');
    it('should contain valid app section');
    it('should contain valid cache section');
    it('should contain valid database section');
    it('should contain valid twitch section');
});

describe('Routes', function() {
    describe('Api', function() {
        describe('v1', function() {
            describe('Index', function() {
                it('should return a 200 response', function(done) {
                    chai.request(server)
                    .get('/api/v1/')
                    .end(function(err, res) {
                        res.should.have.status(200);
                        done();
                    });
                });
                it('should return JSON object', function(done) {
                    chai.request(server)
                    .get('/api/v1/')
                    .end(function(err, res) {
                        res.should.be.json;
                        done();
                    });
                });
            });
            describe('Twitch', function() {

                describe('Index', function() {
                    it('should return JSON object');
                });
                
                describe('Hosts', function() {
                    it('should return JSON object');
                });
                describe('Utils', function() {
                    describe('Index', function() {
                        it('should return JSON object');
                    });
                    describe('getId', function() {
                        it('should return JSON object');
                    });
                    describe('getUsername', function() {
                        it('should return JSON object');
                    });
                });
                describe('Viewers', function() {
                    it('should return JSON object');
                });
            });
        });
    });
});

describe('Utils', function() {
   
});



/*eslint-enable */