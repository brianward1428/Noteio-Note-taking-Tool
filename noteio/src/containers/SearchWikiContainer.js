import React from 'react';
// import {Link} from "react-router-dom";
import WikiCard from "../components/WikiCard";
import {connect} from "react-redux";
import {searchWiki} from "../actions/wikiSearchActions";
import {Link, useHistory} from "react-router-dom";
import NotebookReducer from "../reducers/NotebookReducer";
import HeaderContainer from "../components/Header";
import {createNotebookFromTemplate} from "../actions/notebookActions";

//this is stateless

const SearchWiki = ({searchTerm, wikiPages, currentUser, selectedPageId, preview,  previewView, dispatch, notebooks}) => {

    let searchInput = "";
    let history = useHistory();

    function handleChange(e) {
        // console.log(e.target.value);
        searchInput = e.target.value;
    }

    function getPreview(){
        let body = " ";
        // console.log("TYPE!!!! ");
        // console.log(typeof preview[1]);
        // console.log("preview[0] : ");
        // console.log(preview[1]);
        for (let e in preview){

                body += e.innerText;
        }
        // console.log("body looks like:")
        // console.log(body)
        var items = Array.from(preview, el => el.innerText);
        // return <h1> HERES WHAT THE PREVIEW SHOULD LOOK LIKE </h1>;
        return items.map(i => (<div>{i}<br/></div>));

    }

    /**
     * So we need to take the preview elements and map them into blocks.
     */
    function createNotebook() {

        if (currentUser) {

            let sections = [];

            let section = {
                id: 0,
                title: 'Section 1',
                blocks: []
            }

            console.log("preview : ", preview);

            for (let element of preview) {

                switch (element.nodeName) {
                    // So were going to save the section were working on, then create a new one..
                    case "H1":
                        sections.push({...section});
                        section = {
                            id: sections.length + 1,
                            title: element.innerText,
                            blocks: []
                        };
                        break;

                    case "H2":
                        sections.push({...section});
                        section = {
                            id: sections.length + 1,
                            title: element.innerText,
                            blocks: []
                        };
                        break;

                    case "H3":
                        sections.push({...section});
                        section = {
                            id: sections.length + 1,
                            title: element.innerText,
                            blocks: []
                        };
                        break;

                    case "P":
                        if (element.outerHTML !== '' && element.outerHTML !== ' ') {
                            section.blocks.push(
                                {
                                    body: element.outerHTML,
                                    position: section.blocks.length + 1
                                }
                            );
                        }

                        break;

                    default:
                        if (element.outerHTML !== '' && element.outerHTML !== ' ') {
                            section.blocks.push(
                                {
                                    body: element.outerHTML,
                                    position: section.blocks.length + 1
                                }
                            );
                        }
                }
            }
            sections.push({...section});

            // NOTE: This was supposed to be the cool part of the project but due the the way I have my DB
            // set up I couldnt figure out how to create all the sections separately with a loop of async calls.
            // due to time constraints I had to give up on this and only allow users to see the preview.

            createNotebookFromTemplate(searchTerm, currentUser._id, sections, dispatch);
            // dispatch({type:"CREATE_NOTEBOOK", sections: sections, title: searchTerm});
            // console.log("the title should be :", searchTerm);
            history.push("/notebook/edit/id");

        } else {
            // there is no current user.
            alert("please log in to create a notebook");
        }
    }

    return (
        <div>
            <HeaderContainer/>
        <div className={"container"}>
            <h1> Search Wikipedia for Inspiration: </h1>
            <div className="input-group my-3 ">
                <div className="container">
                    <div className="input-group-prepend">
                        <div className="d-none d-sm-block">
                                <span className="input-group-text wbdv-field wbdv-new-course"
                                      id="basic-addon1">Search Wikipedia : </span>
                        </div>
                        <input type="text" className="form-control"
                               placeholder="Computer Science" aria-label="New Course Title"
                               aria-describedby="basic-addon1"
                               onChange={handleChange}/>
                        <button type="button"
                                className="btn btn-primary wbdv-button wbdv-add-course"
                                onClick={() => {
                                    if (searchInput === ""){
                                        alert("Please write a search term in the box!")
                                    } else {
                                        searchWiki(searchInput, dispatch)
                                    }
                                }}>
                            <svg width="1em" height="1em" viewBox="0 0 16 16"
                                 className="bi bi-search" fill="currentColor"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                      d="M10.442 10.442a1 1 0 0 1 1.415 0l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1 1 0 0 1 0-1.415z"/>
                                <path fill-rule="evenodd"
                                      d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zM13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0z"/>
                            </svg>

                        </button>
                    </div>
                </div>
            </div>

            <div className={ previewView ? 'd-none' : 'd-block'}>
            <div className="card-columns" >
                {wikiPages.map((page, key) => <WikiCard title={page.title} pageId={page.pageid} dispatch={dispatch}/>)}
            </div>
            </div>
            <div className={ previewView ? 'd-block': 'd-none' }>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-7">
                            <h1> PREVIEW</h1>
                        </div>
                        <div className="col-sm-3">
                            <button type="button" className="btn btn-primary " onClick={createNotebook}>Use Template</button>
                        </div>
                        <div className="col-sm-2">

                            <button type="button"
                                        className="btn btn-danger"
                                        onClick={() => dispatch({type: "TOGGLE_PREVIEW"})}>
                            Back
                                </button>
                        </div>
                    </div>
                    {getPreview()}
                </div>
            </div>

            </div>
        </div>
    )
}


const mapStateToProps = state => ({
    searchTerm : state.WikiReducer.searchTerm,
    wikiPages: state.WikiReducer.wikiPages,
    selectedPageId : state.WikiReducer.selectedPageId,
     preview : state.WikiReducer.preview,
     previewView: state.WikiReducer.previewView,
    notebooks: state.NotebookReducer.notebooks,
    currentUser: state.userReducer.currentUser,
});

const SearchWikiContainer = connect(mapStateToProps)(SearchWiki);

export default SearchWikiContainer;
