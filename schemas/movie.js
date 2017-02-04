var mongoose = require('mongoose');
mongoose.Promise=global.Promise;

var MovieSchema = new mongoose.Schema({
    doctor:String,
    title:String,
    language:String,
    country:String,
    summary:String,
    flash:String,
    poster:String,
    year:Number,
    meta:{
        createAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
});

MovieSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else{
        this.meta.updateAt = Date.now()
    }

    next()
});

MovieSchema.statics = {
    fetch:function(cb){
/*        return this
                .find({})
                .sort({'meta.updateAt':-1})
                .exec(cb);*/


        var query=this.find({});
        var promise = query.sort('meta.updateAt').exec(cb);
        return promise
    },
    findById:function(id,cb){
/*        return this
                .findOne({_id:id})
                .exec(cb)*/

        var query=this.findOne({_id:id});
        var promise = query.exec(cb);
        return promise
    }
};

module.exports = MovieSchema;