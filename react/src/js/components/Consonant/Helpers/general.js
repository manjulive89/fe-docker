import forOwn from 'lodash/forOwn';

export const saveBookmarksToLocalStorage = (bookmarksValue) => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarksValue, null, 2));
};

export const readBookmarksFromLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem('bookmarks'));
    return Array.isArray(data) ? data : [];
};

export const truncateString = (str, num) => {
    if (str.length <= num) return str;
    return `${str.slice(0, num)}...`;
};

export const truncateList = (limit, list) => {
    // No limit, return all;
    if (limit < 0) return list;

    // Slice received data to required q-ty;
    return list.slice(0, limit);
};

export const removeDuplicatesByKey = (list, key) => {
    const newList = [];
    const ids = new Set();
    list.forEach((item) => {
        if (!ids.has(item[key])) {
            newList.push(item);
            ids.add(item[key]);
        }
    });
    return newList;
};


export const chain = (...args) => args.reduce((a, b) => a.concat(b), []);

export const chainFromIterable = args => chain(...args);

export const isSuperset = (superset, subset) => {
    // eslint-disable-next-line no-restricted-syntax
    for (const elem of subset) {
        if (!superset.has(elem)) {
            return false;
        }
    }
    return true;
};

export const intersection = (setA, setB) => {
    const intersectionSet = new Set();
    // eslint-disable-next-line no-restricted-syntax
    for (const elem of setB) {
        if (setA.has(elem)) {
            intersectionSet.add(elem);
        }
    }
    return intersectionSet;
};

export const sortByKey = (iterable, keyFunc) => [...iterable].sort((a, b) => {
    if (keyFunc(a) < keyFunc(b)) return -1;
    if (keyFunc(a) > keyFunc(b)) return 1;
    return 0;
});

export const sanitizeText = text => text.toLowerCase().trim();

export const mapObject = (object, func) => {
    const newObj = {};

    forOwn(object, (value, key) => {
        newObj[key] = func(value);
    });

    return newObj;
};

/**
 * Determines whether the passed in value is an object or not
 * @param {Any} val - Start value in the range array;
 * @return {Boolean} - Whether the passed in value is nullish or not
 */
export const isObject = val => !!val && (val.constructor === Object);

/**
 * Support method so HTL/Sightly can pass authored properties to React
 * @param {Object} Value - Start value in the range array;
 * @return {Object} - Authored config used by react component
 */
export const parseToPrimitive = (value) => {
    if (isObject(value)) {
        return mapObject(value, parseToPrimitive);
    } else if (Array.isArray(value)) {
        return value.map(parseToPrimitive);
    } else if (typeof value !== 'string') {
        return value;
    }

    try {
        return JSON.parse(value);
    } catch (e) {
        return value;
    }
};

/**
 * Determines whether the passed in value is nullish or not
 * @param {Any} val - Start value in the range array;
 * @return {Boolean} - Whether the passed in value is nullish or not
 */
export const isNullish = val => val === undefined || val === null || Number.isNaN(val);

export const isAtleastOneFilterSelected =
        filters => chainFromIterable(filters.map(f => f.items)).some(item => item.selected);

export const stopPropagation = e => e.stopPropagation();

/**
 * Return a range of numbers from [start, ... , end];
 * @param {number} start - Start value in the range array;
 * @param {number} end - End value in the range array;
 * @return {Array}
 */
export const generateRange = (startVal, end) => {
    let start = startVal;
    let step = 1;
    const range = [];

    if (end < start) {
        step = -step;
    }

    while (step > 0 ? end >= start : end <= start) {
        range.push(start);
        start += step;
    }

    return range;
};

/**
 * Gets what start and end numbers should be for a given page
 * @param {number} pageCount - Total pages to display
 * @param {number} currentPageNumber - Current page user is on
 * @param {number} totalPages - Total number of pages available
 * @return {Array} - The start and end page numbers
 */
export const getPageStartEnd = (currentPageNumber, pageCount, totalPages) => {
    const halfPageCount = Math.floor(pageCount / 2);
    let start;
    let end;

    if (totalPages <= (pageCount + 1)) {
        // show all pages
        start = 1;
        end = totalPages;
    } else {
        start = Math.min(
            Math.max(1, currentPageNumber - halfPageCount),
            totalPages - pageCount,
        );
        end = Math.max(
            Math.min(currentPageNumber + halfPageCount, totalPages),
            pageCount + 1,
        );
    }

    return [start, end];
};

/**
* Gets the start number for Paginator Component
* @param {Int} currentPageNumber - Current page the user is on
* @param {Int} showItemsPerPage - How many items to show per page
* @returns {Int} - The start number for Paginator Component
*/
export const getStartNumber = (currentPageNumber, showItemsPerPage) => {
    if (currentPageNumber === 1) return 1;
    return (currentPageNumber * showItemsPerPage) - (showItemsPerPage - 1);
};

/**
* Gets the end number for Paginator Component
* @param {Int} currentPageNumber - Current page the user is on
* @param {Int} showItemsPerPage - How many items to show per page
* @param {Int} totalResults - Total count of cards in collection
* @returns {Int} - The end number for Paginator Component
*/
export const getEndNumber = (currentPageNumber, showItemsPerPage, totalResults) => {
    const res = currentPageNumber * showItemsPerPage;
    return res < totalResults ? res : totalResults;
};
