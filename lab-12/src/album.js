import React, {useEffect, useState} from 'react';
import './App.css';
import bridge from './bridge';
import {Carousel, Card, Button} from "react-bootstrap";

export const Album = (props) => {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        bridge.getAlbumPhotos(props.id).then((result) => {
            const photoItems = [];

            for (const photo of result.data)
                photoItems.push(
                    <Carousel.Item key={photo.id}>
                        <img
                            className="h-50 d-inline-block"
                            src={photo.url}
                        />
                        <Carousel.Caption>
                            <h3>{photo.title}</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                );

            setPhotos(photoItems);
        });
    }, []);

    return (
        <Carousel>
            {photos}
        </Carousel>
    );
};

export const AlbumCard = (props) => {
    const openAlbum = () => {
        props.openCallback(props.album.id);
    };

    return (
        <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src={props.album.thumbnailUrl}/>
            <Card.Body>
                <Card.Title>{props.album.title}</Card.Title>
                <Card.Text>
                    By {props.album.author.username} aka {props.album.author.name}
                </Card.Text>
                <Button variant="primary" onClick={openAlbum}>View album</Button>
            </Card.Body>
        </Card>
    );
};
