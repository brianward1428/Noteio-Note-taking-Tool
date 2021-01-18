import React from  'react'
import {Link, useHistory} from "react-router-dom";
import {connect} from "react-redux";
import {register} from "../actions/userActions";
import HeaderContainer from "./Header";


const Register = ({dispatch}) => {

    let history = useHistory();

    let userName = undefined;
    let password1 = undefined;
    let password2 = undefined;
    let firstName = undefined;
    let lastName = undefined;
    let email = undefined;
    let isAdmin = false;

    let watchUserName = (e) => {
        // console.log(e.target.value);
        userName = e.target.value;
    }

    let watchPassword1 = (e) => {
        // console.log(e.target.value);
        password1 = e.target.value;
    }

    let watchPassword2 = (e) => {
        // console.log(e.target.value);
        password2 = e.target.value;
    }

    let watchFirstName = (e) => {
        // console.log(e.target.value);
        firstName = e.target.value;
    }
    
    let watchLastName = (e) => {
        // console.log(e.target.value);
        lastName = e.target.value;
    }
    let watchEmail = (e) => {
        // console.log(e.target.value);
        email = e.target.value;
    }
    let watchIsAdmin = (e) => {
        // console.log(e.target.value);
        isAdmin = !isAdmin;
    }


        return (
            <div>
                <HeaderContainer/>
                <main>
            <div className="container mh-100">
                <div className="container-fluid vertical-center">

                    <div className="row w-100 justify-content-center">

                        <div className="col-md-6 ">
                            <form>
                                <div className="row">
                                    <div className="col text-center px-0 py-3">
                                        <h1> Register </h1>
                                    </div>
                                </div>
                                <div className="row form-group align-center mx-auto">
                                    <label className="col-md-4" htmlFor="username">User
                                        Name:</label>
                                    <input type="username"
                                           className="col-md-8 form-control"
                                           placeholder="UserName" id="username"
                                    onChange={(e) => watchUserName(e)}/>
                                
                                <   label className="col-md-4" htmlFor="username">First
                                        Name:</label>
                                    <input type="name"
                                           className="col-md-8 form-control"
                                           placeholder="First name" id="firstName"
                                           onChange={(e) => watchFirstName(e)}/>

                                    <label className="col-md-4" htmlFor="username">Last
                                        Name:</label>
                                    <input type="name"
                                           className="col-md-8 form-control"
                                           placeholder="Last name" id="lastName"
                                           onChange={(e) => watchLastName(e)}/>
                                    
                                    <label className="col-md-4" htmlFor="email">Email:</label>
                                    <input type="email"
                                           className="col-md-8 form-control"
                                           placeholder="alice@gmail.com" id="email"
                                           onChange={(e) => watchEmail(e)}/>
                                    
                                    <label className="col-md-4"
                                           htmlFor="password1">Password:</label>
                                    <input type="password"
                                           className="col-md-8 form-control"
                                           placeholder="*******" id="password1"
                                           onChange={(e) => watchPassword1(e)}/>

                                    <label className="col-md-4" htmlFor="password2">Verify
                                        Password:</label>
                                    <input type="password"
                                           className="col-md-8 form-control"
                                           placeholder="*******" id="password2"
                                           onChange={(e) => watchPassword2(e)}/>
                                    <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-sm-4">
                                        </div>
                                        <div className="col-sm-4">
                                        <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="defaultCheck1"
                                           onChange={(e) => watchIsAdmin(e)}/>
                                    <label className="form-check-label" for="defaultCheck1">
                                        Admin
                                    </label>
                                    </div>
                                    </div>
                                        </div>
                                        <div className="col-sm-4">
                                        </div>
                                    </div>
                                </div>

                                <div className="container px-0">
                                    <div className="row mx-auto">
                                        <div className="col text-center px-0 py-3">
                                            <button type="button"
                                               className="btn btn-primary btn-block"
                                               onClick={ () => {
                                                    if (!(userName && password1 && password2 && firstName && lastName && email)) {
                                                        console.log("userName = ",userName);
                                                        console.log("password1 = ",password1);
                                                        console.log("password2 = ",password2);
                                                        console.log("firstName = ",firstName);
                                                        console.log("lastName = ",lastName);
                                                        console.log("email = ",email);

                                                        alert("please fill out all items");
                                                    } else {
                                                        if (password1 !== password2) {
                                                            alert("passwords dont match");
                                                        } else {
                                                            register(userName, password1, firstName, lastName, email, isAdmin, dispatch, history)
                                                        }
                                                    }
                                               }
                                               }>Register</button>
                                        </div>
                                    </div>
                                    <div className="col-sm text-right px-0">
                                        <Link className="btn btn-primary btn-block" to={`/login`}>
                                            Back to Login
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
                </main>
            </div>);
    };


const mapStateToProps = state => ({
    currentUser : state.userReducer.currentUser,
});

const RegisterComponent = connect(mapStateToProps)(Register);


export default RegisterComponent;
