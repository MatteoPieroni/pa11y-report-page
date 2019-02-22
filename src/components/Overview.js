import React from 'react';

export const Overview = ({totalNumberOfErrors, numberOfPages, previousNumberOfErrors}) => {
    const improvementPercent = (totalNumberOfErrors - previousNumberOfErrors) / previousNumberOfErrors * 100;
    return (
        <div className="overview__container">
            <p className="overview__number-errors">
                <span>{totalNumberOfErrors}</span>
                Errors in total
            </p>
            <p className="overview__number-pages">
                <span>{numberOfPages}</span>
                Pages checked
            </p>
            <p className="overview__number-comparison">
                <span>{improvementPercent}</span>
                Improvement
            </p>
        </div>
    )
}