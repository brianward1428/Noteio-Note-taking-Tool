import React from  'react'
import {Link, useHistory} from "react-router-dom";
import UserService from '../services/UserService';
import {connect} from "react-redux";
import {LogInAttempt} from "../actions/userActions";
import HeaderContainer from "./Header";


const LogInComponent = ({currentUser, dispatch}) => {

        let history = useHistory();
        let userName = null;
        let password = null;


        let watchUserName = (e) => {
            userName = e.target.value;
            // console.log(e.target.value);
        }

        let watchPassword = (e) => {
            password = e.target.value;
            // console.log(e.target.value);
        };



        return (
            <div>
                <HeaderContainer/>
                <main>
        <div className="container mh-100">
            <div className="container-fluid vertical-center">
                <div className="row w-100 justify-content-center">
                    <div className="col-md-6 w-100">
                        <form>
                            <div className="row">
                                <div className="col text-center px-0 py-3">
                                    <h1>Login </h1>
                                </div>
                            </div>
                            <div className="row form-group mx-auto">
                                <label className="col-md-3 px-0" htmlFor="userName1">Username
                                    :</label>
                                <input type="userName"
                                       className=" col-md-9 form-control wbdv-field wbdv-username"
                                       placeholder="Alice1234" id="userName1"
                                       aria-describedby="userNameHelp" 
                                       onChange={(e) => watchUserName(e)}/>
                            </div>
                            <div className="row form-group align-center mx-auto">
                                <label className="col-md-3 px-0" htmlFor="password1">Password
                                    :</label>
                                <input type="password"
                                       className=" col-md-9 form-control wbdv-field wbdv-password"
                                       placeholder="******" id="password1"
                                       aria-describedby="passwordHelp" 
                                       onChange={(e) => watchPassword(e)}/>
                            </div>
                            <div className="container w-100 px-0 ">
                                <div className="row w-100 px-0 mx-auto">
                                    <div className="col-sm text-left px-0">
                                        {/*<Link to={`/forgotPassword`} >*/}
                                        {/*    Forgot Password*/}
                                        {/*</Link>*/}
                                    </div>
                                    <div className="col-sm text-right px-0">
                                        {/*<Link to={`/register`} >*/}
                                        {/*Sign Up*/}
                                        {/*</Link>*/}
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="col text-center px-0 py-3">
                                        {/* <Link className="btn btn-primary btn-block" to={`/profile/brianWard1428`} 
                                        onClick={() => {
                                            if (userName != null && password != null){
                                                LogInAttempt(userName, password);
                                            } else {
                                                alert("Please enter a valid username and password.");
                                            }
                                        }}>
                                            Login
                                        </Link> */}
                                        <button type={"button"} className="btn btn-primary btn-block"
                                        onClick={() => {
                                            console.log("button clicked");
                                            if (userName != null && password != null){
                                                LogInAttempt(userName, password, dispatch, history);
                                            } else {
                                                alert("Please enter a valid username and password.");
                                            }
                                        }}>
                                            Login
                                        </button>
                                        <Link className="btn btn-primary btn-block" to={`/register`}>
                                            Register
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
                </main>
            </div>);
    
}

const mapStateToProps = state => ({
    currentUser : state.userReducer.currentUser,
});

const LogIn = connect(mapStateToProps)(LogInComponent);

export default LogIn;
