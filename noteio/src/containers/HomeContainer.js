import React from 'react'
import {Link} from "react-router-dom";
import Profile from "../components/Profile";
import NotebookListComponent from "../components/NotebookList";
import HeaderContainer from "../components/Header";
import {connect} from "react-redux";
import {deleteUser, getAllUsers} from "../actions/userActions";
import {createNotebook, deleteNotebook, getAllNotebooks} from "../actions/notebookActions";

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: this.props.currentUser,
            users: this.props.users,
            notebooks: this.props.notebooks,
            newNotebookTitle: "new Notebook",
            isAddingNotebook: false,
        };

        this.viewMyNotebooks = this.viewMyNotebooks.bind(this);
    }

    handleNewSectionTitleChange = (e) => {
        // console.log(e.target.value);
        this.setState({
                          newNotebookTitle: e.target.value,
                      })
    };

    createNotebook = () => {

        if (this.props.currentUser){
            createNotebook({title: this.state.newNotebookTitle, authors: [this.props.currentUser._id], sections : []}, this.props.dispatch);
        } else {
            alert("please log in to create a notebook.");
        }
    };

    hasEditAccess = (notebookAuthors) => {

        if (this.state.user) {
            return (this.props.currentUser.isAdmin || notebookAuthors.includes(this.props.currentUser._id));
        } else {
            return false;
        }
    };


    selectNotebook = (n) => {
        // only authors and admins get to go to the notebook editing page.
        console.log("selecting notebook :", n.title);
        this.props.dispatch( { type: 'SELECT_NOTEBOOK', notebook: n });

        let link = (
            <Link
                to={`/notebook/view/${n._id}`}
                >
                {n.title}
            </Link>);

        if(this.props.currentUser) {
            if (this.props.currentUser.isAdmin || n.authors.includes(this.props.currentUser._id)) {
                link = (
                    <Link
                        to={`/notebook/edit/${n._id}`}>
                        {n.title}
                    </Link>)
            }
        }

        return link;

    };

    viewMyNotebooks = () => {
        if (this.state.user) {
            console.log("okay view just mine", this.state.user);
        } else {
            alert("Please login or signUp to view your notebooks");
        }
    };

    adminStatus = () => {
        if (this.state.user) {
            if (this.state.user.isAdmin) {
                return true;
            }
        }
        return false;
    };

    render() {
        return (
            <div>
                <HeaderContainer/>
                <main>
                    <div className="container-flex">
                        <div className="row"
                             style={{
                                 display: (this.props.currentUser)
                                          ? 'block'
                                          : 'none'
                             }}>
                            <h3>Welcome {this.props.currentUser ? this.props.currentUser.username : 'Visitor'}</h3>
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <div className="row">
                                    <h1> Public Notebooks</h1>
                                    <div className="col-sm-8">
                                    </div>
                                    <div className="col-sm-3">
                                        <select className="form-select form-select-sm"
                                                aria-label=".form-select-sm example"
                                                onChange={(e) => {this.props.dispatch({type: 'SORT_NOTEBOOKS', order: e.target.value})}}>
                                            <option selected>Sort By</option>
                                            <option value="NEWEST">newest</option>
                                            <option value="OLDEST">oldest</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <ul className="list-group">
                                        {this.props.notebooks.map(n =>
                                                                      <li className="list-group-item">
                                                                          <div className="row">
                                                                              <div
                                                                                  className="col-sm-4">
                                                                                  <Link
                                                                                      to={`/notebook/edit/${n._id}`}
                                                                                      style={{
                                                                                          display: (this.hasEditAccess(n.authors))
                                                                                                   ? 'block'
                                                                                                   : 'none'
                                                                                      }}
                                                                                  onClick={() => {console.log("selecting notebook :", n.title);
                                                                                      this.props.dispatch( { type: 'SELECT_NOTEBOOK', notebook: n });}}>
                                                                                      {n.title}
                                                                                  </Link>
                                                                                  <Link
                                                                                      to={`/notebook/view/${n._id}`}
                                                                                      style={{
                                                                                          display: (!this.hasEditAccess(n.authors))
                                                                                                   ? 'block'
                                                                                                   : 'none'
                                                                                      }}
                                                                                      onClick={() => {console.log("selecting notebook :", n.title);
                                                                                          this.props.dispatch( { type: 'SELECT_NOTEBOOK', notebook: n });}}>
                                                                                      {n.title}
                                                                                  </Link>
                                                                              </div>

                                                                                <div className="col-sm-5">
                                                                                    created: {new Date(n.createdAt).toDateString()}

                                                                                </div>

                                                                              <div
                                                                                  className="col-sm-3">
                                                                                  <button
                                                                                      className={"btn btn-outline-danger"}
                                                                                      style={{
                                                                                          display: (this.adminStatus())
                                                                                                   ? 'block'
                                                                                                   : 'none'
                                                                                      }}
                                                                                    onClick={() => deleteNotebook(n._id, this.props.dispatch)}> Delete
                                                                                  </button>
                                                                              </div>
                                                                          </div>
                                                                      </li>
                                        )}

                                    </ul>
                                    <div style={{
                                        display: (this.adminStatus() || this.props.currentUser)
                                                 ? 'block'
                                                 : 'none'
                                    }}>
                                    <div className={this.state.isAddingNotebook ? 'd-none' : 'd-block'}>
                                        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => {this.setState({isAddingNotebook : true})}}>New Notebook
                                        </button>
                                    </div>
                                    <div className={this.state.isAddingNotebook ? 'd-block' : 'd-none'}>
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control"
                                                   placeholder={this.state.newNotebookTitle} aria-label="Section Name"
                                                   aria-describedby="button-addon2" onChange={this.handleNewSectionTitleChange}/>
                                            <div className="input-group-append">
                                                <button className="btn btn-outline-secondary" type="button"
                                                        id="button-addon2"
                                                        onClick={this.createNotebook}
                                                >Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6 justify-content-center">
                                <h1> All Users</h1>
                                <div className="row">
                                    <div className="col-sm-6">
                                    </div>
                                    <div className="col-sm-3">
                                        <select className="form-select form-select-sm"
                                                aria-label=".form-select-sm example"
                                                onChange={(e) => {this.props.dispatch({type: 'SORT_USERS', order: e.target.value})}}>

                                            <option selected>Sort By</option>
                                            <option value="NEWEST">newest</option>
                                            <option value="OLDEST">oldest</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                <ul className="list-group">
                                    {this.props.users.map(u =>
                                                              <li className="list-group-item">
                                                                  <div className="row">
                                                                      <div className="col-sm-3">
                                                                          <Link
                                                                              to={`/profile/${u.id}`}
                                                                              onClick={() =>
                                                                                  this.props.dispatch(
                                                                                      {
                                                                                          type: 'SELECT_USER',
                                                                                          user: u
                                                                                      })
                                                                              }>
                                                                              {u.firstName} {u.lastName}
                                                                          </Link>
                                                                      </div>
                                                                      <div className="col-sm-6">
                                                                          joined: {new Date(u.createdAt).toDateString()}
                                                                      </div>
                                                                      <div className="col-sm-3">
                                                                          <button
                                                                              className={"btn btn-outline-danger"}
                                                                              style={{
                                                                                  display: (this.adminStatus())
                                                                                           ? 'block'
                                                                                           : 'none'
                                                                              }}
                                                                              onClick={() => deleteUser(
                                                                                  u._id,
                                                                                  this.props.dispatch)}> Delete
                                                                          </button>
                                                                      </div>
                                                                  </div>
                                                              </li>
                                    )}
                                </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>);
    }

};

const mapStateToProps = state => ({
    currentUser: state.userReducer.currentUser,
    users: state.userReducer.users,
    notebooks: state.NotebookReducer.notebooks,

});

const HomeContainer = connect(mapStateToProps)(Home);

export default HomeContainer;
