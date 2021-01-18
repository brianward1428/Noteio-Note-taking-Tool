import SectionService from "../services/SectionService";


let sectionService = new SectionService();

export const createSection = ( nId, section, dispatch) => {

    console.log("we are sending the section to be created : ", section);

    sectionService.createSection(nId, section).then(res =>
                                        {
                                            if (res.status){
                                                console.log("error : ", res);
                                                alert(res.status);
                                            }else {
                                                console.log("okay we created the section :", res);
                                                dispatch({type:'ADD_SECTION', section: res})
                                            }
                                        });
};

export const addBlock = (nId, sId, sectionBlocks, dispatch) => {

    let newSection = {blocks : [...sectionBlocks, {body: "new block"}]};

    sectionService.updateSection(nId, sId, newSection).then(res =>
                                                            {
                                                                if (res.status){
                                                                    console.log("error : ", res);
                                                                    alert(res.status);
                                                                }else {
                                                                    console.log("okay the updated section looks like :", res);
                                                                    dispatch({type: "ADD_BLOCK", sId: sId, nId: nId})
                                                                }
                                                            });

};

export const saveBlock = (nId, sId, sectionBlocks, blockPosition, blockBody, dispatch) => {

    let newSection = {blocks : [...sectionBlocks.map((b,key) => {
                                                        if (key === blockPosition){
                                                            return {body: blockBody}
                                                        } else {
                                                            return b;
                                                        }
                                           }
    )]};

    sectionService.updateSection(nId, sId, newSection).then(res =>
                                                            {
                                                                if (res.status){
                                                                    console.log("error : ", res);
                                                                    alert(res.status);
                                                                }else {
                                                                    console.log("okay we added a block, the updated section looks like :", res);
                                                                    // dispatch({type: "ADD_BLOCK", sId: sId, nId: nId})
                                                                    dispatch({type: 'SAVE_BLOCK', body: blockBody, position: blockPosition, sectionId : sId, notebookId : nId});
                                                                }
                                                            });

};
