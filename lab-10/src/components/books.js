import React, {useEffect, useState} from "react";
import {getBooks} from '../server-bridge';


const Book = props => {
    return (
        <p>
            {props.data.name}
            <br/>
            {props.data.author}
            <br/>
            {JSON.stringify(props.data.genres)}
        </p>
    );
};

const BooksList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        async function fetchBooksData() {
            // fetch books from server
            const booksData = await getBooks();
            setBooks(booksData.data);
        }

        fetchBooksData().catch(err => {
            alert(err);
        });
    }, []);

    return (
        <div className="list">
            <h3>Books</h3>
            <ul>
                {books.map(book => <li key={book._id}><Book data={book}/></li>)}
            </ul>
        </div>
    );
};

export default BooksList;
