import React from  'react'
import {Link} from "react-router-dom";


class ForgotPassword extends React.Component {

    render() {

        return (
            <div className ="container mh-100">
                <div className ="container-fluid vertical-center">

                    <div className="row w-100 justify-content-center">

                        <div className="col-md-6 ">
                            <form>
                                <div className="row">
                                    <div className="col text-center px-0 py-3">
                                        <h1>Reset Password </h1>
                                    </div>
                                </div>
                                <div className="form-group align-center">
                                    <input type="email" className="form-control" placeholder="Enter Your Email" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                        <div className="row">
                                            <div className="col text-center">
                                                <small id="emailHelp" className="form-text text-muted">We'll send a password reset link to your email on file.</small>
                                            </div>
                                        </div>
                                </div>

                                <div className="container">
                                    <div className="row">

                                        <div className="col-sm text-right px-0">
                                            <Link to={`/login`} >
                                                Back to Login
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="container">
                                    <div className="row">
                                        <div className="col text-center px-0 py-3">
                                            <button type="submit" className="btn btn-primary btn-block">Send</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default ForgotPassword;
