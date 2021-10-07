import React from "react";
import {Card} from "react-bootstrap";

const ClassifiedImage = (props) => {
    return (
            <Card style={{ width: '15rem' }} className="mx-auto mb-4">
                <Card.Img variant="top" src={props.image}/>
                <Card.Body>
                    <Card.Title>Classified Name: <br/> {props.name ? props.name: "Not Found"}</Card.Title>
                </Card.Body>
            </Card>
    );
}

export default ClassifiedImage;