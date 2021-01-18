require('../data/db')();

var bodyParser = require('body-parser');
var notebookDao = require('../daos/notebook.dao.server');
var sectionDao = require('../daos/section.dao.server');

module.exports = (app) => {

    var jsonBodyParser = bodyParser.json();
    var urlEncodedBodyParser = bodyParser.urlencoded({extended: false});

    app.use(jsonBodyParser);

    const findAllNotebooks = (req, res) => {
        console.log("trying to fetch all notebook : ");
        notebookDao.findAllNotebooks().then(notebooks => {
            console.log("found notebooks :", notebooks);
            res.json(notebooks);
        }).catch(err => res.json({status: err}));

    };
    app.get('/api/notebooks', findAllNotebooks);

    const findAllNotebooksForUser = (req, res) => {
        console.log("trying to fetch all notebook for user : ", req.params.uId);
        notebookDao.findAllNotebooksForUser(req.params.uId).then(notebooks => {
            console.log("found notebooks :", notebooks);
            res.json(notebooks);
        }).catch(err => res.json({status: err}));
    };
    app.get('/api/users/:uId/notebooks', findAllNotebooksForUser);

    const createNotebook = (req, res) => {
        let notebook = req.body;
        console.log("the section were trying to create looks like: ", notebook);
        notebookDao.createNotebook(notebook).then(notebook => {
            console.log("successfully created section :", notebook);
            res.json(notebook)
        }).catch(err => res.json({status: err}));
    };
    app.post("/api/notebooks", createNotebook);

    const deleteNotebook = (req, res) => {
        console.log("trying to delete notebook : ", req.params.nId);
        notebookDao.deleteNotebook(req.params.nId).then(response => {
            console.log("okay were about to try to delete all these sections :", response.sections);
            sectionDao.deleteManySections(response.sections).then(resp => console.log("and the response to deleteMany was :", resp));
            res.json(response);
        }).catch(err => res.json({status: err}));
    };

    app.delete("/api/notebooks/:nId", deleteNotebook);


    const updateNotebook = (req, res) => {
        console.log("trying to update notebook : ", req.params.nId);
        notebookDao.updateNotebook(req.params.nId, req.body).then(response => {
            res.json(response)
        }).catch(err => res.json({status: err}));
    };

    app.put("/api/notebooks/:nId", updateNotebook);


};
