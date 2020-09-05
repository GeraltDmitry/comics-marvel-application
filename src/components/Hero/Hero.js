import React, { PureComponent } from 'react';
import axios from "axios";

class Hero extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            hero: null
        }
    }

    componentDidMount() {
        axios.get(`http://gateway.marvel.com/v1/public/characters/${this.props.match.params.heroId}?ts=5&apikey=97d6b53aeaa37c80cbfc9807574b0be1&hash=78204913f9e6ca37081c1ffe953309f2`)
            .then((response) => {   
                console.log('response: ', response);     
                this.setState({ hero: response.data.data.results[0] });
            });
    }

    render() {
        const { hero } = this.state;
        console.log('hero: ', hero);
        if (!hero) {
            return false; 
        }
        
        const { title, description, thumbnail: { path, extension } } = hero;
        
        console.log('this.props: ', this.props.match.params.heroId);
        return (
            <div >
                <div  key={hero.id}>
                    <div>{title}</div>
                    <div>{description}</div>
                    <img src={`${path}.${extension}`} />
                </div>
        </div>
        );
    }
}
export default Hero;