import React from 'react'
import {saveBlock} from "../actions/sectionActions";

// import {connect} from "react-redux";
import TextEditV2 from "./TextEditV2";
import parse from 'html-react-parser';


class BlockComponentV2 extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editing : false,
            body : this.props.block.body
        };
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSaveEdit = this.handleSaveEdit.bind(this);
    }



    // handleEditButton(value)  {
    //     this.setState({ showEdit: value });
    //     console.log("hovered!")
    // }
    handleEditOn = () => this.setState({ editing: true });
    handleEditOff = () => this.setState({ editing: false });


    handleSaveEdit(newBody)  {

        saveBlock(this.props.section.notebookId, this.props.section._id, this.props.section.blocks, this.props.position, newBody, this.props.dispatch);
        // console.log("trying to save block..");
        this.setState({ editing: false,
                                body: newBody});
        // this.props.dispatch({type: 'SAVE_BLOCK', body: newBody, position: this.props.block.position, sectionId : this.props.sectionId})
    };

    handleTextChange(e) {
        console.log(e.target.value);
        this.setState({
                          body: e.target.value,
                      });
    }

    getPreview() {
        return parse(this.state.body);
    }

    render() {
        return (
            <div className={"container border"}   onClick={this.handleEditOn}  onMouseLeave={this.handleEditOff}>

                {/* IF WERE NOT EDITNG */}

                <div className={!this.state.editing ? 'd-block'
                                                    : 'd-none'}>
                    <div className="row">
                        <div className="col-sm-12">
                             {this.getPreview()}
                        </div>
                    </div>
                </div>

                {/* IF WERE ASCTUALLY EDITNG TEXT */}

                <div className={this.state.editing === true ? 'd-block'
                                                            : 'd-none'}>
                    <div className="row">
                        <TextEditV2 handleSaveEdit={this.handleSaveEdit} body={this.state.body}/>
                    </div>
                </div>

            </div>

        );
    }
}


export default BlockComponentV2;
