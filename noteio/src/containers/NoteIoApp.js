import React from  'react'
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';

import WikiReducer from "../reducers/WikiReducer";
import SearchWikiContainer from "./SearchWikiContainer";
import userReducer from "../reducers/UserReducer";
import NotebookReducer from "../reducers/NotebookReducer";
import NotebookEditorContainer from "./NotebookEditorContainer";
import LogIn from "../components/LogIn";
import RegisterComponent from "../components/Register";
import ForgotPassword from "../components/ForgotPassword";
import HomeContainer from "./HomeContainer";
import NotebookService from "../services/NotebookService";
import UserService from "../services/UserService";
import Profile from "../components/Profile";
import NotebookViewContainer from "./NotebookViewContainer";


const rootReducer = combineReducers({WikiReducer, NotebookReducer, userReducer})


class NoteIoApp extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            initialState : { },
        }
    }

    componentDidMount() {
        let notebookService = new NotebookService();
        notebookService.getAllNotebooks().then(resp => {
            console.log("componentDidMount notebook response : ", resp);
            this.setState(
                {
                    initialState : {...this.state.initialState,
                                    NotebookReducer: { selectedNotebook : undefined,
                                                        notebooks: resp}
                    }
                }
            )
        });
        let userService = new UserService();

        userService.getAllUsers().then(resp => {
            console.log("componentDidMount user response : ", resp);

            this.setState(
                {
                    initialState : {...this.state.initialState,
                        userReducer: { currentUser : undefined,
                            users: resp}
                    }
                }
            )
        });
    }


        render () {

        return (
            <Provider store={createStore(rootReducer, this.state.initialState)}>

                <Router>
                    <Route path="/login"
                           render={() => <LogIn/>}/>
                    <Route path="/register"
                           render={() => <RegisterComponent/>}/>
                    <Route path="/forgotPassword"
                           render={() => <ForgotPassword/>}/>
                    <Route path="/home"
                           render={() => <HomeContainer/>}/>
                    <Route path="/profile/:id"
                           render={() => <Profile/>}/>
                    <Route path="/searchWiki"
                           render={() => <SearchWikiContainer/>}/>
                    <Route path="/notebook/edit/:id"
                           render={() => <NotebookEditorContainer/>}/>
                    <Route path="/notebook/view/:id"
                           render={() => <NotebookViewContainer/>}/>
                </Router>
            </Provider>

        )
    }
}
// const NoteIoAppComponent = connect()(NoteIoApp);

export default NoteIoApp;
