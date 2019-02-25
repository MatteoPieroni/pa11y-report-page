import React from 'react';
import reportData from '../ac-pa11y-report.json';

import { PageRow } from '../components/PageRow';
import { Overview } from '../components/Overview';

export default class Index extends React.Component {
    constructor(props) {
        super(props);

        const previousRead = reportData[reportData - 2] ? reportData[reportData - 2] : [];

        this.state = {
            loading: true,
            currentRead: reportData[reportData.length - 1],
            previousRead: previousRead,
            data: reportData,
            currentTotalNumberOfErrors: "",
            currentNumberOfPages: "",
            previousNumberOfErrors: "",
        }
    }

    componentDidMount() {
        this.setState({
            currentTotalNumberOfErrors: this.calculateTotalErrors(this.state.currentRead),
            currentNumberOfPages: this.state.currentRead.length,
            previousNumberOfErrors: this.state.previousRead.length,
        });
    }

    calculateTotalErrors = (arrayOfPageArrays) => {
        let numberOfErrors = 0;
        arrayOfPageArrays.forEach(pageArray => {
            if(pageArray.issues) {
                numberOfErrors += pageArray.issues.length;
            }
        })
        return numberOfErrors;
    }

    render() {
        const { currentRead, data, currentTotalNumberOfErrors, currentNumberOfPages, previousNumberOfErrors } = this.state;
        
        return (
            <main className="container">
                <Overview totalNumberOfErrors={currentTotalNumberOfErrors} numberOfPages={currentNumberOfPages} previousNumberOfErrors={previousNumberOfErrors} />
                <h2>All pages</h2>
                {
                    currentRead &&
                    currentRead.map(pageData => <PageRow
                            pageData={pageData}
                            totalNumberOfErrors={currentTotalNumberOfErrors}
                        />
                    )
                }
            </main>
        )
    }
};