import React, { PureComponent } from 'react';
import { Link } from "react-router-dom";
import cx from 'classnames';
import PageNavigation from '../PageNavigation';
import theme from './Heroes.module.css';

class Heroes extends PureComponent {
    static defaultProps = {
        heroes: [],
        currentPageNumber: 1,
        isLoaded: false,
        limit: 0
    };

    render() {
        const { heroes, limit, isLoaded, currentPageNumber, onPageNumberClick } = this.props;
        
        return (
            <div>
                <div>Heroes</div>
                <input onChange={this.handleChangeInput}/>
                {!isLoaded && <div>LOADING</div>}
                {isLoaded &&
                    <>
                        <div className={cx(theme.heroes)}>
                            {heroes.map((hero) => {
                                const { name, description, thumbnail: { path, extension } } = hero;

                                return (
                                    <Link to={`/hero/${hero.id}`} key={hero.id} className={cx(theme.comic)}>
                                    <div key={hero.id} className={cx(theme.hero)}>
                                        <div>{name}</div>
                                        <div className={cx(theme['hero-description'])}>{description}</div>
                                        <img className={cx(theme['hero-image'])} src={`${path}.${extension}`} />
                                    </div>
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

export default Heroes;
