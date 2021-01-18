import React from 'react'

// import {connect} from "react-redux";

class BlockComponent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editing : false,
            body : this.props.block.body
        };
        this.handleTextChange = this.handleTextChange.bind(this);
    }



    // handleEditButton(value)  {
    //     this.setState({ showEdit: value });
    //     console.log("hovered!")
    // }
    handleEditOn = () => this.setState({ editing: true });
    handleEditOff = () => this.setState({ editing: false });


    handleSaveEdit = () => {
        console.log("trying to save edit..")
        this.setState({ editing: false })
    };

    handleTextChange(e) {
        console.log(e.target.value);
        this.setState({
                          body: e.target.value,
                      });
    }

    render() {
        return (
            <div className={"container border"}   onClick={this.handleEditOn}  onMouseLeave={this.handleEditOff}>

                {/* IF WERE NOT EDITNG */}

                <div className={!this.state.editing ? 'd-block'
                                                             : 'd-none'}>
                    <div className="row">
                        <div className="col-sm-12">
                    <p> {this.state.body} </p>
                        </div>
                    </div>
                </div>

                {/* IF WERE ASCTUALLY EDITNG TEXT */}

                <div className={this.state.editing === true ? 'd-block'
                                                             : 'd-none'}>
                    <div className="row">
                        <div className="col-sm-12">
                            <textarea className="form-control" id="exampleFormControlTextarea1"
    rows="3" onChange={this.handleTextChange} value={this.state.body}/>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}


export default BlockComponent;
