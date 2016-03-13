var ElasticSearch   = require('elasticsearch');

var Elastic = new ElasticSearch.Client({
    host: process.env.ELASTIC_URL
});

var internals = {};

/**
 *  The item model this is an extension of the Models object
 */
module.exports = function(Mongoose) {
    var that = this;

    var itemSchema = new Mongoose.Schema({
        _hash       : { type : String, unique : true },
        _sort       : { type : Number, required : true },
        title       : { type : String, trim : true },
        source      : { type : String },
        type        : { type : String, enum: that.getItemTypes()},
        data        : { type : Mongoose.Schema.Types.Mixed, required : 'Data is required.' },
        score       : { type : Number, default : 0 },
        likes       : { type : Number, default : 0 },
        dislikes    : { type : Number, default : 0 },
        ip          : { type : String, default : null },
        _token      : { type : String, default : null },
        source_type : { type : String, default : 'none' },
        sfw         : { type : Boolean, default : true },
        scraped     : { type : Boolean, default : false },
        enabled     : { type : Boolean, default : true },
        views       : { type : Number, default : 0 },
        fragments   : { type : Array, default : [] },
        dimensions  : { type : Mongoose.Schema.Types.Mixed },
        author      : { type : String, lowercase : true }
    }).plugin(require('mongoose-times'));

    //after save, add to ES
    itemSchema.post('save', internals.indexIntoElastic);

    //needs to be pre here bcs mongoose
    itemSchema.pre('update', internals.updateIntoElastic);

    //on remove
    itemSchema.post('remove', internals.deleteFromElastic);

    return Mongoose.model('Item', itemSchema);
};

internals.indexIntoElastic = function (item, next) {
    if (!item) {
        return next(null, item);
    }

    if (item.enabled === false) {
        return internals.deleteFromElastic(item, next);
    }

    var body = item.toObject();

    delete body._id;
    delete body.__v;
    delete body.search;

    var elasticSearchObject = {
        index: 'gsi',
        type: 'items',
        id : item._id.toString(),
        body: body
    };

    return Elastic.index(elasticSearchObject, function (err) {
        if (err) {
            return next(err);
        }

        return next(null, item);
    });
};

internals.updateIntoElastic = function (item, next) {
    if (!item) {
        return next(null, item);
    }

    if (item.enabled === false) {
        return internals.deleteFromElastic(item, next);
    }

    var elasticSearchObject = {
        index: 'gsi',
        type: 'items',
        id : item._id,
        body: item
    };

    return Elastic.index(elasticSearchObject, function (err) {
        if (err) {
            return next(err);
        }

        return next(null, item);
    });
};

internals.deleteFromElastic = function (item, next) {
    var elasticSearchObject = {
        index: 'gsi',
        type: 'items',
        id : item._id.toString()
    };

    return Elastic.delete(elasticSearchObject, function (err) {
        if (err) {
            return next(err);
        }

        return next(null, item);
    });
};



