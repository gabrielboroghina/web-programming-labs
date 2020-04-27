import React, {useEffect, useState} from "react";
import {getBooks, addBook} from '../server-bridge';


const Book = props => {
    return (
        <tr>
            <td>{props.data.name}</td>
            <td>{props.data.author}</td>
            <td>{JSON.stringify(props.data.genres)}</td>
        </tr>
    );
};

const BooksList = () => {
    const [books, setBooks] = useState([]);

    async function fetchBooksData() {
        // fetch books from server
        const booksData = await getBooks();
        setBooks(booksData.data);
    }

    useEffect(() => {
        fetchBooksData().catch(err => {
            alert(err);
        });
    }, []);

    const addNewBook = () => {
        const genres = document.getElementById("genres").value.split(",");
        const book = {
            name: document.getElementById("title").value,
            authorId: document.getElementById("author").value,
            genres: genres,
        };

        addBook(book)
            .then(() => {
                // update the table
                fetchBooksData();
            })
            .catch(err => {
                document.getElementById("err").innerText = err.response.data.error;
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
                            <th>Title</th>
                            <th>Author</th>
                            <th>Genres</th>
                        </tr>
                        </thead>
                        <tbody>
                        {books.map(book => <Book data={book}/>)}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="column">
                <div>
                    <fieldset>
                        <legend>Add a new book:</legend>
                        <label htmlFor="title">Title: </label>
                        <input type="text" id="title" name="title"/><br/><br/>
                        <label htmlFor="author">Author: </label>
                        <input type="text" id="author" name="author"/><br/><br/>
                        <label htmlFor="genres">Genre: </label>
                        <input type="text" id="genres" name="genre"/><br/>
                        <span id="err" style={{color: "red"}}></span>
                        <br/><br/>
                        <button onClick={addNewBook}>Submit</button>
                    </fieldset>
                </div>
            </div>
        </div>
    );
};

export default BooksList;
