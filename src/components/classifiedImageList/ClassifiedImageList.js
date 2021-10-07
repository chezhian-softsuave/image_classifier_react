import React, {Component} from "react";
import axios from "axios";
import ClassifiedImage from "./ClassifiedImage";
import {Button, Spinner} from "react-bootstrap";

class ClassifiedImageList extends Component {
    state = {
        classifiedImages: [],
        visible: 3,
        isLoading: true
    }


    componentDidMount() {
        this.getImages()

    }

    getImages() {
        axios.get(
            "http://localhost:8000/api/images/",
            {
                headers: {
                    "accept": "application/json"
                }
            })
            .then(resp => {
                this.setState(
                    {
                        classifiedImages: resp.data,
                        isLoading: false

                    }
                )
                console.log(resp)
            })

    }

    loadMoreImages = () => {
        const visible = this.state.visible;
        const add_visible = visible + 2;
        this.setState({
            visible: add_visible
        });
    }

    render() {
        const images = this.state.classifiedImages.slice(0, this.state.visible).map(img => {
            return <ClassifiedImage key={img.id} image={img.photo} name={img.classification}/>
        });
        return (
            <div>
                {this.state.isLoading &&
                <Spinner animation="border" role="status"/>
                }

                <React.Fragment>
                    {this.state.classifiedImages.length === 0 &&
                    <h3>No images classified</h3>
                    }
                    {images}
                    {(this.state.classifiedImages.length > this.state.visible) ?
                        <Button variant='primary' size='lg' onClick={this.loadMoreImages}>Load more</Button>
                        :

                        <h3>No more images to load</h3>
                    }


                </React.Fragment>
            </div>

        );
    }
}

export default ClassifiedImageList;