var crypto = require('crypto');
var bcrypt = require('bcryptjs');

function getRandomString(len){
    if(!len) {
        len =16
    }

    return crypto.randomBytes(Math.ceil(len/2).toString('hex'))
}

var should = require('should');
var app = require('../../app');
var mongoose = require('mongoose');
var User = require('../../app/models/user');

var user;
//test
descripe('<Unit Test>',function(){
    descripe('Model User:',function(){
        before(function(done){
            user = {
                name:getRandomString(),
                password:'password'
            }

            done()
        })

        descripe('Before Method save:',function(){
            it('should begin without test user',function(done){
                User.find({name:user.name},function(err,users){
                    users.should.have.length(0)

                    done()
                })
            })
        })

        descripe('Should save without:',function(){
            it('should begin without test user',function(done){
                User.find({name:user.name},function(err,users){
                    users.should.have.length(0)

                    done()
                })
            })
        })
    })
});
