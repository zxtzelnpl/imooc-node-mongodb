var mongoose = require('mongoose');
var Movie = require('../models/movie.js');

exports.index=function(req,res){
    console.log(req.session.user);

    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err)
        }
        res.render('index', {
            title: 'imooc 首页',
            movies: movies
        })
    });
};
