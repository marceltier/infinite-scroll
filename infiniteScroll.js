const infiniteScroll = customSettings => {
    "use strict";
    let currentPage = 0;
    let requestsNumber = 0;
    let requestsTimeout;

    let settings = {
        containerId: '',
        url: '',
        elements: [],
        items: 10,
        buffer: 0,
        startAt: 0,
        startAttributeName: '',
        endAttributeName: '',
        itemHtmlTag: 'div',
        itemClassName: '',
        threshold: 1.0,
        loader: false,
        loaderClassName: '',
        loaderText: '',
        requestsLimit: 3,
        requestsLitmitTimeout: 5000
    }
    
    settings = Object.assign(settings, customSettings);
        
    const displayError = error => {
        const body = document.querySelector('body');
        const errorElement = document.createElement('div');
        errorElement.setAttribute("style", "position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999999; background: #fff; color: red; outline: 4px solid red; padding: 2rem; box-shadow: 10px 10px 10px rgba(0,0,0,.3); border-radius: 2rem;");
        errorElement.textContent = error;
        body.appendChild(errorElement);
    }

    (function settingsValidator(settings) {

        const requiredValidator = value => {
            value.forEach(item => {
                if (item.length === 0) throw new Error(`Required setting isn't provided`)
            })
        }

        const typeValidator = (value, type) => {
            value.forEach(item => {
                if (typeof item !== type) throw new Error(`${item} is not a ${type}`)
            });
        }

        try {
            requiredValidator([
                settings.containerId,
                settings.url,
                settings.startAttributeName,
                settings.endAttributeName,
            ])

            typeValidator([
                settings.containerId,
                settings.url,
                settings.startAttributeName,
                settings.endAttributeName,
                settings.itemHtmlTag,
                settings.itemClassName,
                settings.loaderClassName,
                settings.loaderText,
            ],
            "string"
            );

            typeValidator([
                settings.items,
                settings.buffer,
                settings.startAt,
                settings.threshold,
                settings.requestsLimit,
                settings.requestsLitmitTimeout,
            ],
            "number"
            );

            typeValidator([
                settings.loader
            ],
            "boolean"
            );
        }
        catch (error) {
            displayError(error);
            throw error;
        }
    })(settings);
    
    const container = document.querySelector(`#${settings.containerId}`);

    const displayLoader = status => {
        if (!settings.loader) return;
        if (status) {
            const loader = document.createElement('div');
            loader.className = `${settings.loaderClassName} loader-${settings.containerId}`;
            loader.textContent = settings.loaderText;
            container.appendChild(loader);
        }
        if (!status) {
            const loaderEl = document.querySelector(`.loader-${settings.containerId}`);
            container.removeChild(loaderEl);
        }   
    }

    const requestsLimitHandler = (settings, currentPage) => {
        requestsTimeout = setTimeout(() => {
            requestsNumber = 0;
            displayLoader(false);
            requestData(settings, currentPage);
        }, settings.requestsLitmitTimeout);
    }

    const requestsLimitReset = () => {
        if (requestsTimeout) clearTimeout(requestsTimeout);
        requestsTimeout = setTimeout(() => requestsNumber = 0, settings.requestsLitmitTimeout);
    }
    
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
            ) container.appendChild(element);
            // Add 'buffered items' observer to the last non-buffered element:
            if (settings.buffer > 0 && itemNo === settings.buffer) loadBufferItems(element, bufferedResult, settings.buffer);
            // Add 'next page' observer to the last element of json fetch:
            if (settings.buffer === 0 && itemNo === settings.items || settings.buffer === buffer && itemNo === settings.items) loadNextPage(element);
        })
    }

    const requestData = async (settings, currentPage) => {
        try {
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