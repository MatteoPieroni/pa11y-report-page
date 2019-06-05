import React from 'react';
import { Fragment } from 'react';
import Dropdown from 'react-accessible-dropdown';

import reportData from '../acc-general-report.json';

import { PageRow } from '../components/PageRow';
import { Overview } from '../components/Overview';

export default class Index extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            currentRead: this.parseData(reportData[reportData.length - 1]),
            currentDate: this.parseData(reportData[reportData.length - 1], true),
            previousRead: this.parseData(reportData[reportData.length - 2]) || [],
            previousDate: this.parseData(reportData[reportData.length - 2], true) || null,
            data: reportData,
        }
    }

    parseData = (dataArray, getDate) => {
        try {
            if (getDate === true) {
                return dataArray.find(el => el.year !== undefined);
            }
            return dataArray.filter(el => el.issues !== undefined);
        } catch {
            return false;
        }
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

    formatDropdownValues = array => {
        return array.map(read => {
            return {
                label: `${read[read.length - 1].day} - ${read[read.length - 1].month} - ${read[read.length - 1].year}`,
                value: read,
            }
        })
    }

    onChangeDropdown = (read, isCurrent) => {
        const toUpdateRead = (isCurrent === true) ? 'currentRead' : 'previousRead';
        const toUpdateDate = (isCurrent === true) ? 'currentDate' : 'previousDate';
        this.setState({
            [toUpdateRead]: this.parseData(read.value),
            [toUpdateDate]: this.parseData(read.value, true),
        })
    }

    render() {
        const { currentRead, currentDate, previousRead, previousDate, data } = this.state;
        const currentTotalNumberOfErrors = this.calculateTotalErrors(this.state.currentRead);
        const currentNumberOfPages = this.state.currentRead.length;
        const previousNumberOfErrors = this.calculateTotalErrors(this.state.previousRead);

        return (
            <main className="container">
                <header className="header__container">
                    <div className="header__date header__previous">
                        { (previousDate !== null) && 
                            <Fragment>
                                <p className="dropdown__label">Previous Benchmark</p>
                                <Dropdown
                                    baseClassName="dropdown"
                                    options={this.formatDropdownValues(data)}
                                    value={{label: `${previousDate.day} - ${previousDate.month} - ${previousDate.year}`, value: previousRead}}
                                    onChange={(read) => this.onChangeDropdown(read, false)}
                                />
                            </Fragment>
                        }
                    </div>
                    <div className="header__date header__current">
                        <p className="dropdown__label">Current Benchmark</p>
                        <Dropdown
                            baseClassName="dropdown"
                            disabled={previousDate === null}
                            options={this.formatDropdownValues(data)}
                            value={{label: `${currentDate.day} - ${currentDate.month} - ${currentDate.year}`, value: currentRead}}
                            onChange={(read) => this.onChangeDropdown(read, true)}
                        />
                    </div>
                </header>
                <Overview
                    currentDate={currentDate}
                    totalNumberOfErrors={currentTotalNumberOfErrors}
                    numberOfPages={currentNumberOfPages}
                    previousNumberOfErrors={previousNumberOfErrors}
                />
                <h2>All pages</h2>
                {
                    currentRead &&
                    currentRead.map((pageData, i) =>
                                     <PageRow
                                        key={i}
                                        pageData={pageData}
                                        totalNumberOfErrors={currentTotalNumberOfErrors}
                                        comparison={previousRead.map(previousPageData => {
                                                if (previousPageData.pageUrl === pageData.pageUrl)
                                                    return previousPageData.issues.length;
                                            }).filter(el => el !== undefined)[0]
                                        }
                                    />
                    )
                }
            </main>
        )
    }
};