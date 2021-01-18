require('../data/db')();

var bodyParser = require('body-parser');
var notebookDoa = require('../daos/notebook.dao.server');
var sectionDao = require('../daos/section.dao.server');

module.exports = (app) => {

    var jsonBodyParser = bodyParser.json();
    var urlEncodedBodyParser = bodyParser.urlencoded({extended: false});

    app.use(jsonBodyParser);

    const findAllSectionsForNotebook = (req, res) => {

        console.log("trying to fetch all sections for notebook : ", req.params.nId);
        sectionDao.findAllSectionsForNotebook(req.params.nId).then(sections => {
            console.log("found sections :", sections);
            res.json(sections);
        }).catch(err => res.json({status: err}));
    };

    app.get('/api/notebooks/:nId/sections', findAllSectionsForNotebook);

    const createSection = (req, res) => {
        console.log("trying to create section for notebook : ", req.params.nId);
        let section = req.body;

        console.log("the section were trying to create looks like: ", section);
        sectionDao.createSection(section).then(section => {
            console.log("sucessfully created section :", section);
            /**
             * SO WE ALSO NEED TO ADD THIS SECTION ID TO ITS PARENT NOTEBOOK RIGHT?
             */
            notebookDoa.addSection(section.notebookId, section._id).then( resp => {
                console.log("the response of addSection = ", resp);
                res.json(section)
            })

        }).catch(err => res.json({status: err}));
    };

    app.post("/api/notebooks/:nId/sections", createSection);

    const deleteSection = (req, res) => {
        console.log("trying to delete section : ", req.params.sId);
        sectionDao.deleteSection(req.params.sId).then(section => {

            notebookDoa.removeSection(section.notebookId, section._id).then( resp => {
                console.log("the response of addSection = ", resp);
                res.json(section)
            });
        }).catch(err => res.json({status: err}));
    };

    app.delete("/api/notebooks/:nId/sections/:sId", deleteSection);

    const updateSection = (req, res) => {
        console.log("trying to update section : ", req.params.sId);
        sectionDao.updateSection(req.params.sId, req.body).then(response => {
            console.log("successfully updated section. res=", response);
            res.json(response)
        }).catch(err => res.json({status: err}));
    };

    app.put("/api/notebooks/:nId/sections/:sId", updateSection);
};
