const mongoose = require('mongoose');
// const block = require('./block.model');
const notebookSchema = require('./notebook.schema.server');
const notebookModel = mongoose.model('NotebookModel', notebookSchema);

const sectionSchema = mongoose.Schema({
                                          title: {type: String, required:true },
                                          notebookId: {type: mongoose.Schema.Types.ObjectId, ref: 'NotebookModel', required:true},
                                          position: {type: Number, required:true },
                                          blocks: [{body: String}]
                                       }, {timestamps: true, collection: 'sections'});

module.exports = sectionSchema;
