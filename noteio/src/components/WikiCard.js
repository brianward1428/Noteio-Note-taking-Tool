import React from 'react'
import {getDescription, selectPage} from "../actions/wikiSearchActions";
// import {Link} from "react-router-dom";


export default class  WikiCard extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        console.log("trying to delete this mofo :");
        // this.props.deleteCourse(this.props.course._id);
    }

    render() {
        return (

            <div className="card" styles={{width: '18rem'}}>
                <img className="card-img-top"
                     src="https://picsum.photos/300/200"/>
                <div className="card-body">
                    {/*<Link to={`/course/edit/${this.props.course._id}`} onClick={() => this.props.selectCourse(this.props.course)}>*/}
                    {/*    <h5 className="card-title">{this.props.course.title}</h5>*/}
                    {/*</Link>*/}

                    <h5 className="card-title">{this.props.title}</h5>

                    <button type="button" class="btn btn-primary" onClick={ () => {

                        console.log("Selecting.")
                        selectPage(this.props.pageId, this.props.dispatch);
                        this.props.dispatch({type:"TOGGLE_PREVIEW"})

                    }
                    }>
                        See Preview
                    </button>

                    <div className="row">
                        <div className="col-sm-4">
                        </div>
                        <div className="col-sm-4">
                        </div>
                        <div className="col-sm-4">
                            <div className="row">
                                <div className="col-md-6">

                                </div>
                                <div className="col-md-6">
                                    {/*<Link to={`/course/edit/${this.props.course._id}`} onClick={() => this.props.selectCourse(this.props.course)}>*/}
                                    {/*<a onClick={ () => {*/}

                                    {/*    console.log("Selecting.")*/}
                                    {/*    selectPage("anything");*/}

                                    {/*}*/}
                                    {/*}>*/}
                                    {/*    <svg width="1em" height="1em" viewBox="0 0 16 16"*/}
                                    {/*         className="bi bi-pencil-square" fill="currentColor"*/}
                                    {/*         xmlns="http://www.w3.org/2000/svg">*/}
                                    {/*        <path*/}
                                    {/*            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>*/}
                                    {/*        <path fill-rule="evenodd"*/}
                                    {/*              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>*/}
                                    {/*    </svg>*/}
                                    {/*</a>*/}
                                    {/*</Link>*/}

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

