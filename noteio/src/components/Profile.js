import React from 'react'
import HeaderContainer from "./Header";
import {Link} from "react-router-dom";
import mapStateToProps from "react-redux/lib/connect/mapStateToProps";
import {connect} from "react-redux";
import {deleteUser, logOut, updateUser} from "../actions/userActions";

class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: this.props.selectedUser ? this.props.selectedUser.username : "",
            firstName: this.props.selectedUser ? this.props.selectedUser.firstName : "",
            lastName: this.props.selectedUser ? this.props.selectedUser.lastName : "",
            email: this.props.selectedUser ? this.props.selectedUser.email : "",
            isEditing: false,
        };
    }

    render() {

        const watchUserName = (e) => {
            this.state.userName = e.target.value;
            console.log(this.state.userName);
        };

        const watchFirstName = (e) => {
            this.state.firstName = e.target.value;
        };

        const watchLastName = (e) => {
            this.state.lastName = e.target.value;
            console.log(this.state.lastName);

        };

        const watchEmail = (e) => {
            this.state.email = e.target.value;
        };

        const toggleEditing = () => {
            console.log("toggling editing");
            this.setState({
                              isEditing : !this.state.isEditing,
            });
            console.log("isEditing = ", this.state.isEditing);

        };

        const fullAccess = () => {
            return ((this.props.currentUser ? this.props.currentUser._id : "X") === (this.props.selectedUser ? this.props.selectedUser._id : "")
                    || (this.props.currentUser ? this.props.currentUser.isAdmin : false));
        };

        // const updateUser = () => {
        //     // console.log("okay so were going t update our user, new email=", email);
        // };

        // const logout = () => {
        //     console.log("okay logout");
        //     l
        // };

        return (
            <div>
                <HeaderContainer/>
                <div className="container mh-100">
                    <div className="container-fluid">
                        <div className="row w-100 justify-content-center">
                            <div className="col-md-6 ">
                                <div className="row ">
                                    <div className="col-sm-12 text-center px-0 py-3 my-3">
                                        <h1> Profile </h1>
                                    </div>
                                </div>
                                <form>
                                    <div className="row form-group align-center  mx-auto">
                                        <div className="col-sm">
                                            <label className="px-0"
                                                   htmlFor="Username">UserName:</label>
                                        </div>
                                        <div className="col-sm">
                                            <p style={{
                                                display: (!this.state.isEditing) ? 'block' : 'none'
                                            }}> {this.state.userName}</p>
                                            <input type="Username"
                                                   className="form-control"
                                                   placeholder={this.state.userName} id="Username"
                                                   style={{display: (this.state.isEditing) ? 'block' : 'none'}}
                                                   onChange={watchUserName}/>
                                        </div>
                                    </div>

                                    <div className="row form-group align-center  mx-auto">
                                        <div className="col-sm">
                                            <label className="px-0" htmlFor="firstName">First
                                                Name:</label>
                                        </div>
                                        <div className="col-sm">
                                            <p style={{
                                                display: (!this.state.isEditing) ? 'block' : 'none'
                                            }}> {this.state.firstName}</p>
                                            <input type="firstName"
                                                   className="form-control"
                                                   placeholder={this.state.firstName} id="firstName"
                                                   style={{display: (this.state.isEditing) ? 'block' : 'none'}}
                                                   onChange={watchFirstName}/>
                                        </div>
                                    </div>

                                    <div style={{display: (fullAccess()) ? 'block' : 'none'}}>
                                        <div className="row form-group align-center  mx-auto">
                                            <div className="col-sm">
                                                <label className="px-0" htmlFor="lastName">Last
                                                    Name:</label>
                                            </div>
                                            <div className="col-sm">
                                                <p style={{
                                                    display: (!this.state.isEditing) ? 'block' : 'none'
                                                }}> {this.state.lastName}</p>
                                                <input type="lastName"
                                                       className="form-control wbdv-field wbdv-username"
                                                       placeholder={this.state.lastName} id="lastName"
                                                       style={{
                                                           display: (this.state.isEditing) ? 'block' : 'none'
                                                       }}
                                                       onChange={watchLastName}/>
                                            </div>
                                        </div>

                                        <div className="row form-group align-center  mx-auto">
                                            <div className="col-sm">
                                                <label className="px-0"
                                                       htmlFor="email">Email:</label>
                                            </div>
                                            <div className="col-sm">
                                                <p style={{
                                                    display: (!this.state.isEditing) ? 'block' : 'none'
                                                }}> {this.state.email}</p>
                                                <input type="email"
                                                       className="form-control wbdv-field wbdv-username"
                                                       placeholder={this.state.email} id="Username"
                                                       style={{
                                                           display: (this.state.isEditing) ? 'block' : 'none'
                                                       }}
                                                       onChange={watchEmail}/>
                                            </div>
                                        </div>

                                        <div className="container">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <button type="button"
                                                            className="btn btn-primary btn-block"
                                                            style={{
                                                                display: (this.state.isEditing) ? 'block' : 'none'
                                                            }}
                                                            onClick={() => toggleEditing()}>
                                                        Back
                                                    </button>
                                                </div>
                                                <div className="col-sm-6">
                                                    <button type="button"
                                                            className="btn btn-primary btn-block wbdv-button wbdv-update"
                                                            style={{
                                                                display: (this.state.isEditing) ? 'block'
                                                                                     : 'none'
                                                            }}
                                                            onClick={() => updateUser(this.props.selectedUser._id, {username: this.state.userName,
                                                                                            firstName: this.state.firstName,
                                                                                            lastName: this.state.lastName,
                                                                                            email: this.state.email}, this.props.dispatch)}>
                                                        Update
                                                    </button>
                                                </div>
                                                <button type="button"
                                                        className="btn btn-primary btn-block"
                                                        onClick={() => toggleEditing()}
                                                        style={{
                                                            display: (!this.state.isEditing) ? 'block' : 'none'
                                                        }}>
                                                    Edit
                                                </button>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-6 text-center px-0 py-3">
                                                    <Link to={`/home`}
                                                          onClick={() => logOut(this.props.dispatch)}
                                                          className={"btn btn-primary btn-sm btn-secondary"}>

                                                        Logout
                                                    </Link>

                                                </div>
                                                <div className="col-sm-6 text-center px-0 py-3">
                                                    <Link to={`/home`}
                                                          onClick={() => deleteUser(this.props.selectedUser._id, this.props.dispatch)}
                                                          className={"btn btn-primary btn-sm btn-danger"}>
                                                        Delete Account
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="row w-100 justify-content-center">
                            <div className="col-sm-8">
                                <div>
                                    <h1> {this.props.selectedUser.firstName}'s Notebooks</h1>
                                    <ul className="list-group">
                                        {this.props.selectedUserNotebooks.map(n =>
                                                                       <li className="list-group-item">
                                                                           <div className="row">
                                                                               <div
                                                                                   className="col-sm-9">
                                                                                   <Link
                                                                                       to={`/notebook/edit/${n.id}`}
                                                                                       onClick={() => this.props.dispatch(
                                                                                           {
                                                                                               type: 'SELECT_NOTEBOOK',
                                                                                               notebook: n
                                                                                           })}>
                                                                                       {n.title}
                                                                                   </Link>
                                                                               </div>
                                                                           </div>
                                                                       </li>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProfileProps = state => ({
    currentUser: state.userReducer.currentUser,
    selectedUser: state.userReducer.selectedUser,
    selectedUserNotebooks: state.userReducer.selectedUser ? state.NotebookReducer.notebooks.filter(n => {
        return (n.authors.filter(a => a === state.userReducer.selectedUser._id).length > 0)
    }) : [],
})

const ProfileComponent = connect(mapStateToProfileProps)(Profile);

export default ProfileComponent;
