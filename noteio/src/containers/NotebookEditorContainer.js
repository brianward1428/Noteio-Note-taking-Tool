import React from 'react'

import {connect} from "react-redux";
import SectionComponent from "../components/SectionComponent";
import HeaderContainer from "../components/Header";
import {updateNotebook} from "../actions/notebookActions";
import {createSection} from "../actions/sectionActions";


class NotebookEditor extends React.Component {

    constructor(props) {
        super(props);

        this.state ={
            addingSection : false,
            newSectionTitle: 'New Section',
        }

        // this.addingSection = this.addingSection.bind(this);
    }

    addingSection = () => {
        this.setState({addingSection : true})
    };

    handleNewSectionTitleChange = (e) => {
        this.setState({newSectionTitle : e.target.value})
    };

    createSection = () => {

        let newSection = {
                            title: this.state.newSectionTitle,
                            notebookId: this.props.selectedNotebook._id,
                            position : this.props.selectedNotebook.sections.length + 1,
                            blocks : [],
                        };

        createSection(this.props.selectedNotebook, newSection, this.props.dispatch);

        this.setState({
                          addingSection : false,
                          newSectionTitle: 'New Section',
                      })
    };


    // console.log("right now im trying to edit :  ", editingTopicId);
    render() {
        return (
            <div>
                <HeaderContainer/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1> {this.props.selectedNotebook? this.props.selectedNotebook.title : 'no notebook selected'} </h1>
                        </div>

                    </div>
                </div>
            <div className={"container"}>
                {this.props.selectedNotebook? this.props.selectedNotebook.sections.map(section =>
                                                              <SectionComponent section={section}
                                                                                dispatch={this.props.dispatch}/>
                ) : "no notebook selected"}
                <div className={this.state.addingSection ? 'd-none' : 'd-block'}>
                <button type="button" className="btn btn-primary btn-lg btn-block" onClick={this.addingSection}>New Section
                </button>
                </div>
                <div className={this.state.addingSection ? 'd-block' : 'd-none'}>

                    <div className="input-group mb-3">
                        <input type="text" className="form-control"
                               placeholder={this.state.newSectionTitle} aria-label="Section Name"
                               aria-describedby="button-addon2" onChange={this.handleNewSectionTitleChange}/>
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary" type="button"
                                        id="button-addon2"
                                        onClick={() => this.createSection()}
                                >Add
                                </button>
                            </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    // So here im referencing the reducer.. interesting...
    selectedNotebook : state.NotebookReducer.selectedNotebook,
    notebooks : state.NotebookReducer.notebooks
});

const NotebookEditorContainer = connect(mapStateToProps)(NotebookEditor);
export default NotebookEditorContainer;
