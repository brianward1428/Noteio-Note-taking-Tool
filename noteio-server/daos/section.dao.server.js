const mongoose = require('mongoose');
const sectionSchema = require('../models/section.schema.server');
const sectionModel = mongoose.model('SectionModel', sectionSchema);

/**
 *
 * Now we can create our functions and export those instead.
 */
const findAllSectionsForNotebook = (nId) => sectionModel.find({notebookId: nId});
const createSection = (section) => sectionModel.create(section);
const updateSection = (sectionId, section) => sectionModel.findByIdAndUpdate(sectionId, {...section}, {new: true});
const deleteSection = (sectionId) => sectionModel.remove({_id: sectionId});
const deleteManySections = (sections) => sectionModel.deleteMany({_id: {$in: sections}});

module.exports = {findAllSectionsForNotebook, deleteManySections, createSection, updateSection, deleteSection};
