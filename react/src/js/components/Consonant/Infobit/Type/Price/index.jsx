import React from 'react';

import { PriceType } from './types';

const defaultProps = {
    term: '',
};

/**
 * Price Infobit (shown in 3:2 Card Footer)
 *
 * @component
 * @example
 * const props= {
    price: String,
    term: String,
 * }
 * return (
 *   <Price {...props}/>
 * )
 */
const Price = ({ price, term }) => (
    <span
        className="consonant-price-infobit">
        <strong
            className="consonant-price-infobit--price">
            {price}
        </strong>
        <span
            className="consonant-price-infobit--term">
            {term}
        </span>
    </span>
);

Price.propTypes = PriceType;
Price.defaultProps = defaultProps;

export default Price;
