import React from 'react';

export const ErrorDetail = ({message, context, selector, code, type}) => {
    return (
            <div className="error-details__container">
                <h3 className="error-details__message">{message}</h3>
                <p className="error-details__context">
                    {context}
                    <br />
                    <span className="error-details__selector">{selector}</span>
                </p>
                <span className="error-details__code">{code}</span>
                <span className="error-details__type">{type}</span>
            </div>
    )
}