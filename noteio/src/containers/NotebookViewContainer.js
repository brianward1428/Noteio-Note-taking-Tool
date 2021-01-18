import React from 'react'

import {connect} from "react-redux";
import SectionComponent from "../components/SectionComponent";
import HeaderContainer from "../components/Header";
import {updateNotebook} from "../actions/notebookActions";
import {createSection} from "../actions/sectionActions";
import parse from 'html-react-parser';


class NotebookView extends React.Component {

    constructor(props) {
        super(props);

        // this.addingSection = this.addingSection.bind(this);
    }

    // console.log("right now im trying to edit :  ", editingTopicId);
    render() {
        return (
            <div>
                <HeaderContainer/>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <h1> {this.props.selectedNotebook.title} </h1>
                        </div>

                    </div>
                </div>
                <div className={"container"}>
                    {this.props.selectedNotebook.sections.map(section =>
                                                                    <div className="container">
                                                                        <h2> {section.title}</h2>
                                                                        {section.blocks.map(b => (<div> {parse(b.body)} </div>))}
                                                                    </div>

                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    selectedNotebook : state.NotebookReducer.selectedNotebook,
});

const NotebookViewContainer = connect(mapStateToProps)(NotebookView);
export default NotebookViewContainer;
