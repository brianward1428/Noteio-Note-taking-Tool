import NotebookService from "../services/NotebookService";
import SectionService from "../services/SectionService";

let notebookService = new NotebookService();
let sectionService = new SectionService();
export const getAllNotebooks = (dispatch) => {

    notebookService.getAllNotebooks().then(res => {
        console.log("notebook response = ", res);
        dispatch({type:'GET_ALL_NOTEBOOKS', notebooks:res})
    })
};

export const createNotebook = (noteBook , dispatch) => {

    notebookService.createNotebook(noteBook).then(res =>
                                                  {
                                                      if (res.status){
                                                          console.log("error : ", res);
                                                          alert(res.status);
                                                      }else {
                                                          dispatch({type: 'CREATE_NOTEBOOK', notebook: res});
                                                          //TODO: need to add notebook still.
                                                      }
                                                  });

};

// async function createMultipleSections (notebookId, sections) {
//     let newSections = [];
//     for await (let section of sections){
//         sectionService.createSection(notebookId, section).then(res => {
//             if (res.status) {
//                 console.log("error : ", res);
//                 alert(res.status);
//             } else {
//                 console.log("created section : ", res);
//                 newSections.push(res)
//             }
//         });
//     }
//     return newSections.map(s => s._id);
// }

export const createNotebookFromTemplate = (noteBookTitle, authorId, sections, dispatch) => {
    console.log("trying to create notebook from template. sections = ", sections);

    /**
     * So this needs to be done in three parts.
     * 1. create Notebook
     * 2. create all the sections
     * 3. add the section Ids to the notebook. (THIS IS ACTUALLY IMPLEMENTED IN THE BACKEND)
     */
    let newNotebook = {title: noteBookTitle, authors:[authorId], sections:[]};

    notebookService.createNotebook(newNotebook).then(res =>
                                                  {
                                                      if (res.status){
                                                          console.log("error : ", res);
                                                          alert(res.status);
                                                      }else {
                                                          // Now we add each section.
                                                          console.log("should be dispatching create notebook : ", res)
                                                          dispatch({type: "CREATE_NOTEBOOK", notebook: res});

                                                          for (let index in sections){

                                                              let newSection = { ...sections[index],
                                                                  notebookId: res._id,
                                                                  position : index,
                                                              }
                                                                sectionService.createSection(res._id, newSection).then(resS => {
                                                                    if (resS.status) {
                                                                        console.log("error : ", resS);
                                                                        alert(resS.status);
                                                                    } else {
                                                                        console.log("created section : ", resS);
                                                                        dispatch({type: "ADD_SECTION", section: resS})
                                                                    }
                                                                });
                                                      }
                                                  }});

};

export const updateNotebook = (nId, noteBook, dispatch) => {

    // so when we update a notebook we really need to start by updating the sections first.
    // o

    notebookService.updateNotebook(nId, noteBook).then(res =>
                                                  {
                                                      if (res.status){
                                                          console.log("error : ", res);
                                                          alert(res.status);
                                                      }else {
                                                          // dispatch({type: 'UPDATE_NOTEBOOK', notebook: res});
                                                          //TODO: need to add notebook still.
                                                      }
                                                  });
};


export const deleteNotebook = (nId, dispatch) => {

    // so when we update a notebook we really need to start by updating the sections first.
    // o

    notebookService.deleteNotebook(nId).then(res =>
                                             {
                                                 if (res.status){
                                                     console.log("error : ", res);
                                                     alert(res.status);
                                                 }else {
                                                     dispatch({type: 'DELETE_NOTEBOOK', notebookId: nId});
                                                     //TODO: need to add notebook still.
                                                 }
                                             });
};
