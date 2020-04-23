import React from 'react';
import './App.css';
import {Authentication} from "./components/authentication";
import {Switch, Route, Link, BrowserRouter} from 'react-router-dom';
import BooksList from "./components/books";
import AuthorsList from "./components/authors";

function App() {
    return (
        <BrowserRouter basename="/">
            <div style={{paddingLeft: 20}}>
                <h3>Menu</h3>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/books">Books</Link>
                    </li>
                    <li>
                        <Link to="/authors">Authors</Link>
                    </li>
                </ul>
            </div>

            <div className="box">
                <Switch>
                    <Route path="/login" component={Authentication}/>
                    <Route path="/books" component={BooksList}/>
                    <Route path="/authors" component={AuthorsList}/>
                </Switch>
            </div>

        </BrowserRouter>
    );
}

export default App;
