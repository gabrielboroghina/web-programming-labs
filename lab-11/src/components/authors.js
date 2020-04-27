import React, {useEffect, useState} from "react";
import {addAuthor, getAuthors, deleteAuthor} from '../server-bridge';


const Author = props => {
    const deleteItem = () => {
        const id = props.data._id;
        deleteAuthor(id).then(() => {
            props.updateAuthors();
        });
    };

    return (
        <tr>
            <td>{props.data.firstName}</td>
            <td>{props.data.lastName}</td>
            <td>
                <button><i className="fas fa-trash-alt" onClick={deleteItem}></i></button>
            </td>
        </tr>
    );
};

const AuthorsList = () => {
    const [authors, setAuthors] = useState([]);

    async function fetchData() {
        // fetch authors data from server
        const authorsData = await getAuthors();
        setAuthors(authorsData.data);
    }

    useEffect(() => {
        fetchData().catch(err => {
            alert(err);
        });
    }, []);

    const addNewAuthor = () => {
        const author = {
            firstName: document.getElementById("firstname").value,
            lastName: document.getElementById("lastname").value,
        };

        addAuthor(author)
            .then(() => {
                // update the table
                fetchData();
            })
            .catch(err => {
            });
    };

    return (
        <div className="container">
            <div className="column">
                <div>
                    <h3>Books</h3>
                    <table>
                        <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {authors.map(author => <Author data={author} updateAuthors={fetchData}/>)}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="column">
                <div>
                    <fieldset>
                        <legend>Add a new book:</legend>
                        <label htmlFor="firstname">First name: </label>
                        <input type="text" id="firstname" name="firstname"/><br/><br/>
                        <label htmlFor="lastname">Last name: </label>
                        <input type="text" id="lastname" name="lastname"/><br/><br/>
                        <button onClick={addNewAuthor}>Submit</button>
                    </fieldset>
                </div>
            </div>
        </div>
    );
};

export default AuthorsList;
