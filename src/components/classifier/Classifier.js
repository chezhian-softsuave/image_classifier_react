import React, {Component} from "react";
import Dropzone from 'react-dropzone';
import './Classifier.css'
import {Alert, Button, Image, Spinner} from "react-bootstrap";
import axios from "axios";

class Classifier extends Component {
    state = {
        files: [],
        isLoadingSpinner: false,
        recentClassifiedImage: null
    }



    onDrop = (files) => {
        this.setState({
            files: [],
            isLoadingSpinner: true,
            recentClassifiedImage: null
        })
        this.afterImageLoad(files)
    }

    loadSpinner = () => {
        this.setState({
            files: [],
            isLoadingSpinner: true
        })
    }

    unLoadSpinner = () => {
        this.setState({
            isLoadingSpinner: false
        })
    }

    afterImageLoad = (files) => {
        setTimeout(() => {
            this.setState({
                files,
                isLoadingSpinner: false
            }, () => {
                console.log(files)
            });
        }, 1000);
    }


    uploadImage = () => {
        this.loadSpinner();
        let formData = new FormData();
        formData.append('photo', this.state.files[0], this.state.files[0].name)
        axios.post(
            "http://localhost:8000/api/images/",
            formData,
            {
                headers: {
                    "accept": "application/json",
                    "content-type": "multipart/form-data"
                }
            }
        ).then(resp => {
            this.getClassifiedImage(resp)
            console.log(resp)
        }).catch(err => {
            console.log(err)
        })
    }

    getClassifiedImage = (obj) => {
        axios.get(
            `http://localhost:8000/api/images/${obj.data.id}/`,
            {
                headers: {
                    "accept": "application/json"
                }
            })
            .then(resp => {
                this.setState(
                    {
                        recentClassifiedImage: resp
                    }
                )
                console.log(resp)
            })
        this.unLoadSpinner();
    }


    render() {
        const files = this.state.files.map(file => (
            <li key={file.name}>
                {file.name} - {file.size} bytes
            </li>
        ));

        return (
            <Dropzone onDrop={this.onDrop} accept='image/*'>
                {({isDragActive, getRootProps, getInputProps}) => (
                    <section className="container">
                        <div {...getRootProps({className: 'dropzone bg'})}>
                            <input {...getInputProps()} />
                            <i className="far fa-image mb-2 text-muted" style={{fontSize: 70}}/>
                            <p className="text-muted">
                                {
                                    isDragActive ? "Drop the image" : "Drag 'n' drop some files here, or click to select files"
                                }
                            </p>
                        </div>
                        <aside>
                            {files}
                        </aside>
                        {this.state.files.length > 0 &&
                        <Button variant="info" size="lg" className='mt-5' onClick={this.uploadImage}>Upload &
                            Classify</Button>
                        }
                        {this.state.isLoadingSpinner &&
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading..</span>
                        </Spinner>
                        }
                        {this.state.recentClassifiedImage &&
                        <React.Fragment>
                            <Alert variant="primary">
                                {this.state.recentClassifiedImage.data.classification}
                            </Alert>
                            <Image className="justify-content-center" src={this.state.recentClassifiedImage.data.photo} height="200" rounded/>
                        </React.Fragment>
                        }
                    </section>
                )}
            </Dropzone>
        );
    }

}

export default Classifier;