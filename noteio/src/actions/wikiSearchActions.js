import WikiService from "../services/WikiServices";

let wikiService = new WikiService();


export const searchWiki = (searchTerm, dispatch) => {
    console.log("trying to search wiki for term : ", searchTerm);
    wikiService.searchWiki(searchTerm).then(r => {
        console.log("responses found...", r);
        console.log("pages should be ...", r.query.pages);
        console.log("trying to iterate through objects...")

        let results = [];
        for (var key in r.query.pages) {
            // check if the property/key is defined in the object itself, not in parent
            if (r.query.pages.hasOwnProperty(key)) {
                results.push(r.query.pages[key])
            }

        }
        console.log("results:", results)
        dispatch({type: 'SEARCH_WIKI', wikiPages : results, searchTerm: searchTerm})
    });
};

export const selectPage = (pageId, dispatch) => {
    wikiService.getWikiPage(pageId).then(r => {
        console.log("made request in ");
        dispatch({type:"SET_PREVIEW", preview: extractData(r)})

    });
};

export const extractData = (doc) => {
    // console.log("the raw data in looks like :", doc);
    // let body = doc.getElementsByTagName('extract')[0];

    // console.log("hopefully this is just the body :", body);

    // //
    // console.log("Trying to print paragraphs");
    // console.log(paragraphs);

    let textBody = doc.getElementsByTagName('extract')[0].textContent;
    // var soup = new JSSoup(textBody);

    let parser = new DOMParser();
    let bodyUpdated = parser.parseFromString(textBody, "text/html");

    // console.log("Text:..");
    // console.log(bodyUpdated);

    let children = bodyUpdated.getElementsByTagName("body")[0].children

    // console.log("babies..");
    // console.log(children);
    return children;
};



// export const getDescription = (pageId, dispatch) => {
//
//     wikiService.getWikiPage(21719).then(r => {
//         let parser = new DOMParser();
//         let body = r.getElementsByTagName('extract')[0];
//         let bodyUpdated = parser.parseFromString(body, "text/html");
//         let preview = bodyUpdated.getElementsByTagName("body")[0]
//         console.log("so Im setting the preview to ");
//         console.log(preview);
//
//         dispatch({type:"SET_PREVIEW", children: preview})
//         dispatch({type:"TOGGLE_PREVIEW"})
//
//     });
// }
