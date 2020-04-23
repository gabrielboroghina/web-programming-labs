import React, {useEffect, useState} from "react";
import {getAuthors} from '../server-bridge';


const Author = props => {
    return (
        <p>
            {props.data.firstName}
            <br/>
            {props.data.lastName}
        </p>
    );
};

const AuthorsList = () => {
    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        async function fetchData() {
            // fetch authors data from server
            const authorsData = await getAuthors();
            setAuthors(authorsData.data);
        }

        fetchData().catch(err => {
            alert(err);
        });
    }, []);

    return (
        <div className="list">
            <h3>Authors</h3>
            <ul>
                {authors.map(author => <li key={author._id}><Author data={author}/></li>)}
            </ul>
        </div>
    );
};

export default AuthorsList;
