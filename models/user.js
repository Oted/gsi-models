/**
 *  The item model this is an extension of the Models object
 */
module.exports = function(Mongoose) {
    var that = this;

    var itemSchema = new Mongoose.Schema({  
        token       : { type : String, required : true},
        email       : { type : String, default : null},
        ip          : { type : String, required : true},
        fetches     : { type : Number, default : 0},
        visits      : { type : Number, default : 1},
        filters     : { type : Mongoose.Schema.Types.Mixed, required : 'Data is required.' }
    }).plugin(require('mongoose-times'));

    return Mongoose.model('User', itemSchema);
};
