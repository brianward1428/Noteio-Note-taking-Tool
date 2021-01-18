import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React from "react";
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";


class TextEditV2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text: this.props.body }; // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this);
        this.handleMouseOff = this.handleMouseOff.bind(this);
    }

    handleChange(value) {
        this.setState({ text: value })
    }
    handleMouseOff() {
        console.log("saving from editor.");
        this.props.handleSaveEdit(this.state.text);

    }


    render() {
        return (
            <div className="container-fluid" onMouseLeave={this.handleMouseOff}>
            <ReactQuill defaultValue={this.state.text} onChange={this.handleChange} />
            </div>
        )
    }
}



export default TextEditV2;
