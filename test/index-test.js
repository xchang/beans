var request = require('supertest')
  , express = require('express');

var app = require('../app/app.js');

describe('GET /', function(){
  it('respond with homepage', function(done){
    request(app)
      .get('/')
      .expect(200, done);
  })
})