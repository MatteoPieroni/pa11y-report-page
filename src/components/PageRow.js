import React, { Fragment } from 'react';
import AnimateHeight from 'react-animate-height';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ErrorDetail } from './ErrorDetail';

export class PageRow extends React.Component {
    state = {
        open: false,
    }

    showDetails = () => {
        this.setState({open: !this.state.open})
    }

    render() {
        const {pageData, comparison} = this.props;
        const {open} = this.state;
        const {documentTitle, pageUrl, issues} = pageData;

        const number = issues && issues.length;
        const percentage = +((number - comparison) * -100 / comparison).toFixed(2);

        return (
            <section className="row single-page__container">
                <div className="single-page__summary">
                    <div className="single-page__title">
                        <h2 className="single-page__name">{documentTitle}</h2>
                        <a href={pageUrl} target="_blank" className="single-page__url">{pageUrl}</a>
                    </div>
                    <div className={`single-page__errors single-page__errors-number ${(number > 10) ? 'single-page__errors--red' : 'single-page__errors--green'}`}>
                        <p><span>{number}</span>errors</p>
                    </div>
                    <div className={`single-page__errors single-page__errors-score ${(percentage < 0) ? 'single-page__errors--red' : ''} ${(percentage > 0) ? 'single-page__errors--green' : ''}`}>
                        <p><span>{!isNaN(percentage) ? `${percentage}%` : 'NA'}</span>{comparison} errors</p>
                    </div>
                </div>
                <div className="single-page__details">
                    <Fragment>
                        <button className="single-page__expand-button" onClick={this.showDetails}>{open ? 'shrink' : 'expand'} <FontAwesomeIcon icon={open ? 'caret-up' : 'caret-down'} /></button>
                        <AnimateHeight height={open ? 'auto' : 0} duration={500}>
                            <Fragment>
                                {issues && 
                                    issues.map((issue, i) => <ErrorDetail
                                                key={i}
                                                opened={open}
                                                message={issue.message}
                                                context={issue.context}
                                                selector={issue.selector}
                                                code={issue.code}
                                                type={issue.type}
                                            />
                                    )
                                }
                            </Fragment>
                        </AnimateHeight>    
                    </Fragment>
                </div>
            </section>
        )                        
    }
}