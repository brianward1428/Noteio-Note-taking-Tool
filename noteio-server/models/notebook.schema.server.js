const mongoose = require('mongoose');
// const sectionSchema = require('section.schema.server');
// const sectionModel = mongoose.model('SectionModel', sectionSchema);
const notebookSchema = mongoose.Schema({
                                       title: {type: String, required:true },
                                       authors: [{type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'}],
                                        sections: [{type: mongoose.Schema.Types.ObjectId, ref: 'SectionModel'}]
                                   }, {timestamps: true, collection: 'notebooks'});

module.exports = notebookSchema;
