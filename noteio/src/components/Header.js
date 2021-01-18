import React from  'react'
import {Link} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {connect} from "react-redux";
// import Form from 'react-bootstrap/Form';
// import FormControl from 'react-bootstrap/FormControl';
// import Button from 'react-bootstrap/Button';

class Header extends React.Component {

    constructor(props) {
        super(props);
    }

    getProfileNav = () => {
        if (! this.props.currentUser) {
        return (<Nav.Link >
            <Link to={`/login`}>
                login
            </Link>
        </Nav.Link>)
    } else {
        return (<Nav.Link >
            <Link to={`/profile/${this.props.currentUser._id}`} onClick={this.props.dispatch({type: "SELECT_USER", user : this.props.currentUser})}>
                profile
            </Link>
        </Nav.Link>);
            }
            };

    render() {

        return (
            <Navbar bg="light" variant="light" sticky="top">
                <Navbar.Brand href="#home">Noteio</Navbar.Brand>
                <Nav className="mr-auto">
                        <Nav.Link >
                            <Link to={`/home`} >
                                Home
                            </Link>
                        </Nav.Link>
                        <Nav.Link >
                            <Link to={`/searchWiki`}>
                            SearchWiki
                        </Link>
                        </Nav.Link>
                </Nav>
                <Nav>
                    {this.getProfileNav()}
                </Nav>
            </Navbar>
            );
    }

}
 const mapStateToProps = state => ({
     currentUser : state.userReducer.currentUser
  });

  const HeaderContainer = connect(mapStateToProps)(Header);

  export default HeaderContainer;
