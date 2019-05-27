const app = require('../../app');
const { expect } = require('chai');
const request = require('supertest');

describe('Users route: /users', function () {
    describe('GET list of all users', function () {
        it('should return an empty array when users don\'t exist', function() {
            // The worst offender of tests.
            // What are we even testing here?
            const result = [];
            expect(result).to.be.an('array').that.is.empty;
        });

        it('should return an array of users when users exist', function(done) {
            // This seems good, but...
            // What's the data source for testing?
            request(app)
                .get('/users')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function(response) {
                    expect(response.body).to.be.an('array').that.is.not.empty;
                    expect(response.body[0]).to.include.all.keys([
                        'id',
                        'firstName',
                        'lastName',
                        'status'
                    ]);
                }).end(done);
        });
    });

    describe('GET user by id', function () {
        it('should return an empty object when user doesn\'t exist by id', function(done) {
            // This seems good, but...
            // For consistency, shouldn't we test for Content-Type?
            // Is it relevant?
            request(app)
                .get('/users/abc')
                .set('Accept', 'application/json')
                .expect(404)
            .end(done);
        });

        it('should return an empty object when user doesn\'t exist by id', function(done) {
            request(app)
                .get('/users/0')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                //.expect(404)  // Because RESTful, we should be returning 404 instead of 200.
                .expect(function (response) {
                    expect(response.body).to.be.an('object').that.is.empty;
                }).end(done);
        });

        it('should return an object when user exist by id', function(done) {
            request(app)
                .get('/users/1')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (response) {
                    expect(response.body).to.be.an('object').that.is.not.empty;
                    expect(response.body).to.include.keys([
                        'id',
                        'firstName',
                        'lastName',
                        'status',
                    ]);
                }).end(done);
        });
    });
});
