export default {
    /**
     * ID selector that determines where to place the content
     *
     * @type {string}
     */
    containerId: '',

    /**
     * URL address to JSON data
     * 
     * @type {string}
     */
    url: '',

    /**
     * Array of elements that are selected to show from the JSON data.
     * 
     * Object contains:
     * key: JSON key
     * type: type of HTML element to show; available options: text|image|link
     * className: class name to be added to the tag (optional)
     * tag: selected HTML tag to use if text type is selected (optional)
     * text: link text for links or alt text for images
     * 
     * @type {array<{key: string, type: string, tag: string, className: string, text: string}>}
     */
    elements: [],

    /**
     * Numbers of items to show at load and at scroll
     * 
     * @type {number}
     */
    items: 10,

    /**
     * Buffer between JSON data fetching and adding items to the browser's DOM. Must be less than 'items' param.
     * 
     * @type {number}
     */
    buffer: 0,

    /**
     * How many rows to skip after the first JSON data loading
     * 
     * @type {number}
     */
    startAt: 0,

    /**
     * Name of the start filter attribute in the JSON URL
     * 
     * @type {string}
     */
    startAttributeName: '',

    /**
     * Name of the end filter attribute in the JSON URL
     * 
     * @type {string}
     */
    endAttributeName: '',

    /**
     * Type of HTML tag for the data item
     * 
     * @type {string}
     */
    itemHtmlTag: 'div',

    /**
     * Class name for the data item
     * 
     * @type {string}
     */
    itemClassName: '',

    /**
     * Threshold for initializing next data loading for the last loaded element
     * 
     * @type {number}
     */
    threshold: 1.0,

    /**
     * Show loader element while loading data
     * 
     * @type {boolean}
     */
    loader: false,

    /**
     * Class name for loader element
     * 
     * @type {string}
     */
    loaderClassName: '',

    /**
     * Text that is showed in loader element
     * 
     * @type {string}
     */
    loaderText: '',

    /**
     * Number of requests that are allowed in a row
     * 
     * @type {number}
     */
    requestsLimit: 3,
    
    /**
     * Time in ms after the request limiter becomes inactive
     * 
     * @type {number}
     */
    requestsLitmitTimeout: 5000
}