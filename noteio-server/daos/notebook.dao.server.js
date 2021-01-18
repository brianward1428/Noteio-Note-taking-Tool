const mongoose = require('mongoose');
const notebookSchema = require('../models/notebook.schema.server');
const notebookModel = mongoose.model('NotebookModel', notebookSchema);
mongoose.set('useFindAndModify', false);

/**
 *
 * Now we can create our functions and export those instead.
 */
const findAllNotebooks = () => notebookModel.find().populate('sections');
// TODO: check if this is the right way to find notebooks for user, athuors is a list.
const findAllNotebooksForUser = (uId) => notebookModel.find({authors: uId});



const createNotebook = (notebook) => notebookModel.create(notebook);
const addSection = (nId, sId) => notebookModel.findByIdAndUpdate(nId,  {"$push": { sections: sId }}, {new: true});
const removeSection = (nId, sId) => notebookModel.findByIdAndUpdate(nId,  {"$pull": { sections: sId }}, {new: true});
const updateNotebook = (notebookId, notebook) => notebookModel.findByIdAndUpdate(notebookId, {...notebook}, {new: true});
const deleteNotebook = (notebookId) => notebookModel.findByIdAndRemove(notebookId);

module.exports = {findAllNotebooks, addSection, removeSection, findAllNotebooksForUser, createNotebook, updateNotebook, deleteNotebook };
