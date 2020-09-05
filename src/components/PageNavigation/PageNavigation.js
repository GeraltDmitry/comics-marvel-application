import React, { PureComponent, Fragment } from 'react';
import cx from 'classnames';
import theme from './PageNavigation.module.css';

class PageNavigation extends PureComponent {
    render() {
        const { currentPageNumber,  onPageNumberClick, limit } = this.props;
        const maxPageNumber = Math.ceil(limit/20);
        const pageNumberArray = [];
        const firstMiddleNumber = currentPageNumber + 3 < maxPageNumber ? currentPageNumber : currentPageNumber - 4;

        if (maxPageNumber < 6) {            
            for (let i = 0; i < maxPageNumber; i++) {
                pageNumberArray.push(i + 1);
            }
            
            return (
                <div className={cx(theme['footer-wrap'])}>
                    <div className={cx(theme['footer'])}>
                        {pageNumberArray.map((cur, pageNumber) => {
                            return(
                                <div className={cx(theme['footer-item'])} onClick={onPageNumberClick(pageNumber + 1)}>{pageNumber + 1}</div>
                            );
                        })}
                    </div>
                </div>
            );
        }
        
        return (
            <div className={cx(theme['footer-wrap'])}>
                <div className={cx(theme['footer'])}>
                    {currentPageNumber !== 1 &&
                        <Fragment>
                            <div className={cx(theme['footer-item'])} onClick={onPageNumberClick(1)}>1</div>
                            <div className={cx(theme['footer-item'])}>...</div>
                        </Fragment>
                    }
                    <div className={cx(theme['footer-item'], theme['footer-current-item'])} onClick={onPageNumberClick(firstMiddleNumber)}>{firstMiddleNumber}</div>
                    <div className={cx(theme['footer-item'])} onClick={onPageNumberClick(firstMiddleNumber + 1)}>{firstMiddleNumber + 1}</div>
                    <div className={cx(theme['footer-item'])} onClick={onPageNumberClick(firstMiddleNumber + 2)}>{firstMiddleNumber + 2}</div>
                    <div className={cx(theme['footer-item'])} onClick={onPageNumberClick(firstMiddleNumber + 3)}>{firstMiddleNumber + 3}</div>
                    <div className={cx(theme['footer-item'])} onClick={onPageNumberClick(firstMiddleNumber + 4)}>{firstMiddleNumber + 4}</div>
                    {currentPageNumber !== maxPageNumber &&
                        <Fragment>
                            <div className={cx(theme['footer-item'])}>...</div>
                            <div className={cx(theme['footer-item'])} onClick={onPageNumberClick(maxPageNumber)}>{maxPageNumber}</div>
                        </Fragment>
                    }
                </div>
            </div>
        );

    }
}

export default PageNavigation;
