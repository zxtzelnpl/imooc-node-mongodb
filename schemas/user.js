var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
mongoose.Promise = global.Promise;
var SALT_WORK_FACTOR = 10;

var UserSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String
    },
    password: {
        unique: true,
        type: String
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now()
    } else {
        this.meta.updateAt = Date.now()
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) {
            return next(err)
        }

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err)
            }
            user.password = hash
        })
    });

});

UserSchema.statics = {
    fetch: function (cb) {
        /*        return this
         .find({})
         .sort({'meta.updateAt':-1})
         .exec(cb);*/


        var query = this.find({});
        var promise = query.sort('meta.updateAt').exec(cb);
        return promise
    },
    findById: function (id, cb) {
        /*        return this
         .findOne({_id:id})
         .exec(cb)*/

        var query = this.findOne({_id: id});
        var promise = query.exec(cb);
        return promise
    }
};

module.exports = UserSchema;