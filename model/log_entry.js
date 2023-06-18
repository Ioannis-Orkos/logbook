const Joi = require('joi');
const mongoose = require('mongoose');
//const { v4: uuidv4 } = require('uuid');

// mongoose.plugin(schema => { 
//     schema.options.objectId = false;
//     schema.options.id = true;
// });

const logSchema = new mongoose.Schema({        
    // _id: {
    //     type: String,
    //     default: uuidv4,
    //     unique: true
    //     //default:  new mongoose.Types.ObjectId().toString() // Generate a unique string for _id
    // },
    id: {
        type: String,
        required: true,
    },
    remark: {
        type: String,
        required: true,
    },
    action: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: false,
    },
    stamp: {
        type:[String],
        default: ["MX0069"]
    },
    date: {
        type: Date,
        default: Date.now()
    },

},{ timestamps: true, // Disable automatic timestamp generation
    //id: false // Exclude _id field from the returned document
    //objectId : false
});
          
const LogEntry = new mongoose.model('log-entries', logSchema);


function validateLogReq(log_entries_req_body) {    
    const schema =  Joi.object({
        id:  Joi.string(),
        remark:  Joi.string(),
        stamp: Joi.string()
            .alphanum()
            .min(3)
            .max(10)
            .required(),
        action: Joi.string()
    });

    return schema.validate(log_entries_req_body);
}



exports.LogEntryModel = LogEntry; 
exports.LogEntryJoiValidate = validateLogReq;