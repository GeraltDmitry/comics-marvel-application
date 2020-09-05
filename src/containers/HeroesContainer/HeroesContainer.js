import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Heroes from '../../components/Heroes';
import { fetchHeroes } from '../../actions';

const mapStateToProps = (state, props) => {
    return {
        heroesArrayBySearchText: state.heroes.heroesArrayBySearchText,
        heroesArrayByOffset: state.heroes.heroesArrayByOffset,
        limit: state.heroes.limit
    };
}

const mapDispatchToProps = (dispatch, props) =>  {
    return {
        fetchHeroes: (offset, searchText) => dispatch(fetchHeroes(offset, searchText))
    };    
}

class HeroesContainer extends PureComponent {
    static defaultProps = {
        heroesArrayBySearchText: {},
        heroesArrayByOffset: {},
        limit: 1
    }

    componentDidMount() {
        if (!(this.props.heroesArrayBySearchText[this.state.searchText] && this.props.heroesArrayBySearchText[this.state.searchText][this.getOffset()])) {
            this.props.fetchHeroes(this.getOffset(), this.state.searchText);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!(this.props.heroesArrayBySearchText[this.state.searchText] && this.props.heroesArrayBySearchText[this.state.searchText][this.getOffset()])) {
            this.props.fetchHeroes(this.getOffset(), this.state.searchText);
        }
    }

    constructor(props) {
        super(props);

        this.state = {
            currentPageNumber: 1,
            searchText: ''
        };
    }

    render() {
        const { heroesArrayBySearchText } = this.props;
        const heroes = heroesArrayBySearchText[this.state.searchText] && heroesArrayBySearchText[this.state.searchText][this.getOffset()];
        const limit = (heroesArrayBySearchText[this.state.searchText] && heroesArrayBySearchText[this.state.searchText].limit) || 0;
        const { currentPageNumber } = this.state;

        return (
            <Heroes
                isLoaded={!!heroes} 
                heroes={heroes}
                limit={limit}
                currentPageNumber={currentPageNumber}
                onPageNumberClick={this.handlePageNumberClick}
                onChangeSearchText={this.handleChangeSearchTextDebounce}
                searchText={this.state.searchText}
            />
        );
    }

    handleChangeSearchText = (value) => {
        this.setState({ searchText: value });
    };

    handleChangeSearchTextDebounce = _.debounce(this.handleChangeSearchText, 250);

    handlePageNumberClick = (currentPageNumber) => () => {
        this.setState({ currentPageNumber });
    };

    getOffset = () => (this.state.currentPageNumber - 1) * 20;
}

export default connect(mapStateToProps, mapDispatchToProps)(HeroesContainer);