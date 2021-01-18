


let initialState = {
    searchTerm : '',
    wikiPages : [],
    selectedPageId : '',
    preview : [],
    previewView: false,
};


const wikiReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'SEARCH_WIKI':
            // console.log("trying to create lesson in reducer : ", action.lesson);
        return {
            ...state,
            wikiPages: action.wikiPages,
            searchTerm: action.searchTerm,
        };

        case 'SET_PREVIEW':
            // console.log("trying to create lesson in reducer : ", action.lesson);
            return {
                ...state,
                preview: action.preview,
            };
        case 'TOGGLE_PREVIEW':
            // console.log("trying to create lesson in reducer : ", action.lesson);
            return {
                ...state,
                previewView: !state.previewView,
            };



        default:
            return state;
    }}



export default wikiReducer;
