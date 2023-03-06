import defaults from './defaults.js';
import { displayError } from './utilities/error.js';
import { settingsValidator } from './utilities/validator.js';

const infiniteScroll = options => {
    "use strict";
    let currentPage = 0;
    let requestsNumber = 0;
    let requestsTimeout;

    const settings = Object.assign(defaults, options);

    /**
     * Adds or removes loader element
     * 
     * @param {boolean} status - true or false: add or remove loader element
     */
    const displayLoader = status => {
        if (!settings.loader) return;

        if (status) {
            const loader = document.createElement('div');
            loader.className = `${settings.loaderClassName} loader-${settings.containerId}`;
            loader.textContent = settings.loaderText;
            document.querySelector(`#${settings.containerId}`).appendChild(loader);
        }
        if (!status) {
            const loaderEl = document.querySelector(`.loader-${settings.containerId}`);
            document.querySelector(`#${settings.containerId}`).removeChild(loaderEl);
        }   
    }

    /**
     * Helper function that blocks too many requests from the user in a row
     * 
     * @param {object} settings 
     * @param {number} currentPage 
     */
    const requestsLimitHandler = (settings, currentPage) => {
        requestsTimeout = setTimeout(() => {
            requestsNumber = 0;
            displayLoader(false);
            requestData(settings, currentPage);
        }, settings.requestsLitmitTimeout);
    }

    /**
     * Helper function for setting a timeout for clearing the number of requests after the declared time
     */
    const requestsLimitReset = () => {
        if (requestsTimeout) clearTimeout(requestsTimeout);
        requestsTimeout = setTimeout(() => requestsNumber = 0, settings.requestsLitmitTimeout);
    }
    
    /**
     * Helper function for loading new content after reaching the last element after previous data fetch
     * 
     * @param {string} element - node element that recieves intersetion observer to initalize new data request ("next page")
     */
    const loadNextPage = element => {
        requestsNumber++;
        currentPage += settings.items;
        const nextPageObserver = new IntersectionObserver(
            function (entries) {
                const [entry] = entries;
                if (!entry.isIntersecting) return;
                requestData(settings, currentPage);
                nextPageObserver.unobserve(element);
            },
            { root: null, threshold: settings.threshold });
        nextPageObserver.observe(element);
    }

    /**
     * Helper function for loading buffered items
     * 
     * @param {string} element - node element that recieves intersetion observer to initialize data load of buffered items
     * @param {object} result - object with fetched data
     * @param {number} buffer - number of items that are buffered
     */
    const loadBufferItems = (element, result, buffer) => {
        const bufferItemsObserver = new IntersectionObserver(
            function (entries) {
                const [entry] = entries;
                if (!entry.isIntersecting) return;
                generateData(result, buffer);
                bufferItemsObserver.unobserve(element);
            },
            { root: null, threshold: settings.threshold });
        bufferItemsObserver.observe(element);
    }

    /**
     * Helper function for adding fetched data to the DOM
     * 
     * @param {object} result - object with fetched data
     * @param {number} buffer - number of items that are buffered
     */
    const generateData = (result, buffer) => {
        let bufferIndex = 0;
        let bufferedResult;
        if (settings.buffer > 0 && buffer === 0) {
            bufferedResult = result.slice(settings.buffer, settings.items);
            result.slice(0, settings.buffer)
        };
        if (buffer > 0) {
            bufferIndex = buffer;
        }

        result.forEach((item, i) => {
            const itemNo = i + bufferIndex + 1;

            const element = document.createElement(settings.itemHtmlTag);
            element.className = settings.itemClassName;
            
            if (settings.elements.length === 0) {
                const values = Object.values(result[i]);
                values.forEach(value => {
                    const child = document.createElement('p');
                    child.textContent = value;
                    element.appendChild(child);
                });
            }

            if (settings.elements.length > 0) {
                settings.elements.forEach(value => {
                    const child = document.createElement(value.tag);
                    child.className = value.className;
                    switch (value.type) {
                        case "text":
                            child.textContent = item[value.key];
                        break;
                        case "link":
                            child.setAttribute('href', item[value.key]);
                            child.textContent = value.text;
                        break;
                        case "image":
                            child.setAttribute('src', item[value.key])
                            child.setAttribute('alt', value.text);
                        break;
                        default:
                            child.textContent = item[value.key];
                    }
                    element.appendChild(child);
                })
            }

            // Add item to the DOM:
            if (
                settings.buffer === 0 
                || itemNo <= settings.buffer 
                || buffer > 0
            ) document.querySelector(`#${settings.containerId}`).appendChild(element);

            // Add 'buffered items' observer to the last non-buffered element:
            if (
                settings.buffer > 0 
                && itemNo === settings.buffer
            ) loadBufferItems(element, bufferedResult, settings.buffer);

            // Add 'next page' observer to the last element of json fetch:
            if (
                settings.buffer === 0 && itemNo === settings.items 
                || settings.buffer === buffer && itemNo === settings.items
            ) loadNextPage(element);
        })
    }

    /**
     * Request data function
     * 
     * @param {object} settings - provides settings object to the function
     * @param {number} currentPage - provides information how many times the data has been fetched
     * @returns {Promise} - promise object of fetched JSON file
     */
    const requestData = async (settings, currentPage) => {
        try {
            settingsValidator(settings);
            const url = `${settings.url}?${settings.startAttributeName}=${settings.startAt + currentPage}&${settings.endAttributeName}=${settings.items + currentPage}`;
            displayLoader(true);
            if (requestsNumber >= settings.requestsLimit) return requestsLimitHandler(settings, currentPage);
            const request = await fetch(url);
            if (!request.ok) throw new Error(error);
            const result = await request.json();
            displayLoader(false);
            requestsLimitReset();
            return generateData(result, 0);
        }
        catch (error) {
            return displayError(error);
        }
    }   
    requestData(settings, 0);
}

export default infiniteScroll;