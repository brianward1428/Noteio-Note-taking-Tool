import React from  'react'
import {Link} from "react-router-dom";
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
import {connect} from "react-redux";
import WikiCard from "./WikiCard";


const NotebookList = ({notebooks, dispatch}) => {


        return (
                <div>
                    <h1> Public Notebooks</h1>
                    <ul className="list-group">
                    {notebooks.map(n =>
                                                    <li className="list-group-item">
                                                        <Link to={`/notebook/edit/${n.id}`} onClick={() => dispatch({type: 'SELECT_NOTEBOOK', notebook: n})}>
                                                            {n.title}
                                                        </Link>
                                                    </li>
                    )}
                    </ul>
                    <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => dispatch({type: 'CREATE_NOTEBOOK', title: 'New Notebook', sections: []})}>
                        New Notebook
                    </button>

                </div>
            );
    }


function mapStateToPropsNotebookList(state) {
    // So here im referencing the reducer.. interesting...
    return {
        notebooks: state.NotebookReducer.notebooks,
    }
}

const NotebookListComponent = connect(mapStateToPropsNotebookList)(NotebookList);
export default NotebookListComponent;
