/**
 *  The item model this is an extension of the Models object
 */
module.exports = function(Mongoose) {
    var that = this;

    var itemSchema = new Mongoose.Schema({
        _hash       : { type : String, unique : true },
        _sort       : { type : Number, required : true },
        title       : { type : String },
        search      : { type : String, lowercase: true, trim: true },
        source      : { type : String },
        type        : { type : String, enum: that.getItemTypes()},
        data        : { type : Mongoose.Schema.Types.Mixed, required : 'Data is required.' },
        score       : { type : Number, default : 0 },
        likes       : { type : Number, default : 0 },
        dislikes    : { type : Number, default : 0 },
        ip          : { type : String, default : null },
        token       : { type : String, default : null },
        source_type : { type : String, default : 'none' },
        sfw         : { type : Boolean, default : true },
        scraped     : { type : Boolean, default : false },
        enabled     : { type : Boolean, default : true },
        views       : { type : Number, default : 0 },
        fragments   : { type : Array, default : [] },
        dimesions   : { type : Mongoose.Schema.Types.Mixed },
        creator     : { type : String, lowercase : true }
    }).plugin(require('mongoose-times'));

    return Mongoose.model('Item', itemSchema);
};
