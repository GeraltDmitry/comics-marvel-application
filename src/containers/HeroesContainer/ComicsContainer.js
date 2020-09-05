import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Comics from '../../components/Comics';
import { fetchComics } from '../../actions';

const mapStateToProps = (state, props) => {
    return {
        comicsArrayBySearchText: state.comics.comicsArrayBySearchText,
        comicsArrayByOffset: state.comics.comicsArrayByOffset,
        limit: state.comics.limit
    };
}

const mapDispatchToProps = (dispatch, props) =>  {
    return {        
        fetchComics: (offset, searchText) => dispatch(fetchComics(offset, searchText))
    };    
}

class ComicsContainer extends PureComponent {
    static defaultProps = {
        comicsArrayBySearchText: {},
        comicsArrayByOffset: {},
        limit: 1
    }

    constructor(props) {
        super(props);

        this.state = {
            currentPageNumber: 1,
            searchText: ''
        };
    } 

    componentDidMount() {
        if (!(this.props.comicsArrayBySearchText[this.state.searchText] && this.props.comicsArrayBySearchText[this.state.searchText][this.getOffset()])) {
            this.props.fetchComics(this.getOffset(), this.state.searchText);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!(this.props.comicsArrayBySearchText[this.state.searchText] && this.props.comicsArrayBySearchText[this.state.searchText][this.getOffset()])) {
            this.props.fetchComics(this.getOffset(), this.state.searchText);
        }
    }

    render() {
        const { comicsArrayBySearchText } = this.props;
        const comics = comicsArrayBySearchText[this.state.searchText] && comicsArrayBySearchText[this.state.searchText][this.getOffset()];
        const limit = (comicsArrayBySearchText[this.state.searchText] && comicsArrayBySearchText[this.state.searchText].limit) || 0;
        const { currentPageNumber } = this.state;

        return (
            <Comics 
                isLoaded={!!comics}
                comics={comics}
                limit={limit}
                currentPageNumber={currentPageNumber}
                onPageNumberClick={this.handlePageNumberClick}
                onChangeSearchText={this.handleChangeSearchTextDebounce}
                searchText={this.state.searchText}
            />
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ComicsContainer);