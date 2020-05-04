import React, {useEffect, useState} from 'react';
import './App.css';
import {Album, AlbumCard} from "./album";
import bridge from "./bridge";
import {Button, Col, Container, Pagination, Row} from "react-bootstrap";

function App() {
    const [albums, setAlbums] = useState([]);
    const [pages, setPages] = useState(0);
    const [activePage, setActivePage] = useState(0);
    const [activeAlbums, setActiveAlbums] = useState([]);
    const [openedAlbum, setOpenedAlbum] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            let result = await bridge.getAlbums();
            const albums = result.data;

            const authors = await bridge.getUsers();
            const photos = await bridge.getPhotos();

            for (const album of albums) {
                album.author = authors.filter(author => author.id === album.userId)[0];
                album.thumbnailUrl = photos.filter(photo => photo.albumId === album.id)[0].thumbnailUrl;
            }

            setAlbums(albums);
            setPages(Math.ceil(albums.length / 10) + 1);
        };
        fetchData();
    }, []);

    const pageChanged = (e) => {
        const pageId = e.target.text;
        const first = (pageId - 1) * 10;
        const last = first + 10;

        setActivePage(pageId);
        setActiveAlbums(albums.slice(first, last));
    };

    function Page(props) {
        return (
            <Row xs={1} md={2} lg={3}>
                {props.albums.map(album => <Col key={album.id}><AlbumCard album={album} openCallback={setOpenedAlbum}/></Col>)}
            </Row>
        );
    }

    return (
        <div className="App">
            {
                openedAlbum
                    ?
                    <Container>
                        <Row>
                            <Col>
                                <Album id={openedAlbum}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="primary" onClick={() => setOpenedAlbum(null)}>Close</Button>
                            </Col>
                        </Row>
                    </Container>
                    :
                    <Container>
                        <Page albums={activeAlbums}/>

                        <Row>
                            <Col>
                                <Pagination className="justify-content-center" onClick={pageChanged}>
                                    {[...Array(pages).keys()].map(id => (
                                        <Pagination.Item key={id} active={id === activePage}>
                                            {id}
                                        </Pagination.Item>
                                    ))}
                                </Pagination>
                            </Col>
                        </Row>
                    </Container>
            }
        </div>
    );
}

export default App;
