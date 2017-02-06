var mongoose = require('mongoose');
mongoose.Promise=global.Promise;

var Schema = mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;

var CatetorySchema = new Schema({
    name:String,
    movies:[{
        type:ObjectId,
        ref:'Movie'
    }],
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

CatetorySchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else{
        this.meta.updateAt = Date.now()
    }

    next()
});

CatetorySchema.statics = {
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

module.exports = CatetorySchema;