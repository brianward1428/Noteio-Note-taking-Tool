
let block1 =    {
                body : "<p> THIS IS THE BODY OF BLOCK 1 </p>",
                position : 1
                }
let block2 =    {
        body : "<p> THIS IS THE BODY OF BLOCK 2 </p>",
        position : 2
}

let section1 = {
                _id : 1,
                title : 'Section 1',
                blocks : [block1, block2]
}

let section2 = {
    _id : 2,
    title : 'Section 2',
    blocks : []
}

let notebook = {
    _id: 1,
    title : 'Notebook 1',
    authors : [],
    sections : [section1, section2],

};

let initialState = {
    selectedNotebook : notebook,
    notebooks : [notebook,]
}


const NotebookReducer = (state = initialState, action) => {

    let newSections;

    switch (action.type) {

        case 'SAVE_BLOCK':


            newSections = state.selectedNotebook.sections.map(s =>
                                                                   {
                                                                       if (s.id === action.sectionId) {

                                                                           return { ...s,
                                                                               blocks: s.blocks.map(b =>
                                                                                                    {
                                                                                                        if(b.position === action.position){
                                                                                                            return {position: b.position,
                                                                                                                body: action.body}
                                                                                                        }
                                                                                                        else {
                                                                                                            return b;
                                                                                                        }
                                                                                                    }
                                                                               )}
                                                                       }
                                                                       else {
                                                                           return s;
                                                                       }
                                                                   }
            );

            return {

                selectedNotebook : {
                                    ...state.selectedNotebook,
                                        sections: newSections
                                    },
                notebooks : state.notebooks.map( n => {
                    if (n._id === action.notebookId){
                        console.log("found notebook.");
                        return {
                                ...n,
                                sections: newSections
                        }
                    } else {
                        return n;
                    }
                }),
            };


        case 'ADD_BLOCK':
            console.log("in Reducer trying to create new block for lesson : ", action.sId);

            newSections = state.selectedNotebook.sections.map(s => {
                    if (s._id === action.sId) {
                        console.log("found the section");
                        let newBlock = {
                            body: "new block",
                        };
                        return {
                            ...s,
                            blocks: [
                                ...s.blocks,
                                newBlock]
                        }
                    }
                    else {
                        return s;
                    }
                });
            console.log("newSections (adding block) now looks like : ", newSections);
            return {
                ...state,
                selectedNotebook: {
                    ...state.selectedNotebook,
                    sections: newSections,
                },
                notebooks : [...state.notebooks.map(n => {
                    if (n._id === action.nId) {
                        return {
                            ...n,
                            sections: newSections,
                        }
                    } else {
                        return n
                    }
                })]
            };

        case 'ADD_SECTION':

            console.log("in reducer, trying to add section :", action.section);
            return {
                ...state,
                selectedNotebook : {...state.selectedNotebook,
                                    sections : [...state.selectedNotebook.sections, action.section]},
                notebooks : [...state.notebooks.map(n => {
                    if (n._id === action.section.notebookId) {
                        return {
                            ...n,
                            sections: [...n.sections,
                                       action.section]
                        }
                    } else {
                        return n
                    }
                })]
            };

            // return {...state};

        case 'CREATE_NOTEBOOK':

            return {
                selectedNotebook : action.notebook,
                notebooks : [...state.notebooks,
                             action.notebook]
            };

        case 'SELECT_NOTEBOOK':
            console.log("selecting notebook in reducer");
            return {
                ...state,
                selectedNotebook : action.notebook,
            };

        case 'DELETE_NOTEBOOK':
            console.log("okay in the reducer we are deleting the notebook with id=", action.notebookId);
            let selectedNotebook = {...state.selectedNotebook};
            if (selectedNotebook._id === action.notebookId) {
                selectedNotebook = undefined;
            }
            return {
                ...state,
                selectedNotebook : action.selectedNotebook,
                notebooks: [...state.notebooks.filter(n => n._id !== action.notebookId)],
            };


        case 'GET_ALL_NOTEBOOKS':

            return {
                ...state,
                notebooks : action.notebooks,
            };
        case 'SORT_NOTEBOOKS':
            console.log("trying to sort notebooks");
            if (action.order === "OLDEST"){
                return   {
                    ...state,
                    notebooks : [...state.notebooks.sort(function(uA, uB){
                        return new Date(uA.createdAt) - new Date(uB.createdAt);
                    })]
                };
            } else {
                return   {
                    ...state,
                    notebooks : [...state.notebooks.sort(function(uA, uB){
                        return new Date(uB.createdAt) - new Date(uA.createdAt);
                    })]
                };
            }


        default:
            return state;
    }}



export default NotebookReducer;
