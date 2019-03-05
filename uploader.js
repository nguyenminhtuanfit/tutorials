import React, {Component} from 'react';
import axios from 'axios'
import './App.css'

const endpoint = 'http://localhost:8000/upload'
class Uploader extends Component{

    state = {
        imageURL : 'https://placeimg.com/320/320/animals'
    }

    constructor() {
        super()
        this.state = {
            selectedFile: null,
            loaded: 0,
        }
    }

    handleselectedFile = event => {
        this.setState({
            selectedFile: event.target.files[0],
            loaded: 0,
        })
    }


    handleUploadFile = (event) => {
        const data = new FormData()
        data.append('file', event.target.files[0])
        data.append('name', 'some value user types')
        data.append('description', 'some value user types')
        axios.post('/files', data).then((response) => {
            this.setState({
                imageUrl: response.data.fileUrl
            })
        })
    }

    handleUpload = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile, this.state.selectedFile.name)

        axios
            .post("", data, {
                onUploadProgress: ProgressEvent => {
                    this.setState({
                        loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
                    })
                },
            })
            .then(res => {
                console.log(res.statusText)
            })

    }

    render() {
        return(
            <div>
                <img width='320' src={this.state.imageUrl} />
                <div>
                    {/*<input type="file" onChange={this.handleUploadFile} />*/}
                    <input type="file" name="" id="" onChange={this.handleselectedFile} />
                    <button onClick={this.handleUpload}>Upload</button>
                    <div> {Math.round(this.state.loaded,2) } %</div>
                </div>
            </div>
        )
    }
}

export default Uploader