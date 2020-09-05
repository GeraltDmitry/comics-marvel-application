import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";
import PageNavigation from '../PageNavigation';
import cx from 'classnames';
import theme from './Comics.module.css';

class Comics extends PureComponent {   
    static defaultProps = {
        comics: [],
        currentPageNumber: 1,
        isLoaded: false,
        limit: 0
    };
 
    render() {
        const { comics, isLoaded, currentPageNumber, onPageNumberClick, limit } = this.props;

        return (
            <div>
                <div>Comics</div>
                <input onChange={this.handleChangeInput}/>
                {!isLoaded && <div>LOADING</div>}
                {isLoaded &&
                    <>
                        <div className={cx(theme.comics)}>
                            {comics.map((comic) => {
                                const { title, description, thumbnail: { path, extension } } = comic;

                                return (
                                    <Link to={`/comic/${comic.id}`} key={comic.id} className={cx(theme.comic)}>
                                        <div>{title}</div>
                                        <div className={cx(theme['comic-description'])}>{description}</div>
                                        <img className={cx(theme['comic-image'])} src={`${path}.${extension}`} />
                                    </Link>
                                );
                            })}
                        </div>
                        <PageNavigation currentPageNumber={currentPageNumber} onPageNumberClick={onPageNumberClick} limit={limit}/>
                    </>
                }
            </div> 
        );
    }
    handleChangeInput = (event) => {
        this.props.onChangeSearchText(event.target.value.trim());
    };
};

export default Comics;