import React, { PureComponent } from 'react';
import axios from "axios";

class Comic extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            comic: null
        }
    }

    componentDidMount() {
        axios.get(`http://gateway.marvel.com/v1/public/comics/${this.props.match.params.comicId}?ts=5&apikey=97d6b53aeaa37c80cbfc9807574b0be1&hash=78204913f9e6ca37081c1ffe953309f2`)
            .then((response) => {   
                console.log('response: ', response);     
                this.setState({ comic: response.data.data.results[0] });
            });
    }

    render() {
        const { comic } = this.state;
        console.log('comic: ', comic);
        if (!comic) {
            return false; 
        }
        
        const { title, description, thumbnail: { path, extension } } = comic;
        
        console.log('this.props: ', this.props.match.params.comicId);
        return (
            <div >
                <div  key={comic.id}>
                    <div>{title}</div>
                    <div>{description}</div>
                    <img src={`${path}.${extension}`} />
                </div>
        </div>
        );
    }
}
export default Comic;