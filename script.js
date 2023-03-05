import infiniteScroll from './infiniteScroll.js';

infiniteScroll({
    containerId: 'loader1',
    url: 'https://jsonplaceholder.typicode.com/posts',
    items: 10,
    buffer: 0,
    startAt: 0,
    startAttributeName: '_start',
    endAttributeName: '_end',
    itemHtmlTag: 'div',
    itemClassName: 'card',
    threshold: 1.0,
    loader: true,
    loaderClassName: 'loader',
    loaderText: 'Loading...',
    requestsLimit: 3,
    requestsLimitTimeout: 5000,
});


// infiniteScroll({
//     containerId: 'loader2',
//     url: 'https://jsonplaceholder.typicode.com/photos',
//     elements: [
//         {key: 'thumbnailUrl', type: 'image', tag: 'img', className: 'thumbnail', text: 'Thumbnail'},
//         {key: 'title', type: 'text', tag: 'h2', className: 'title'},
//         {key: 'url', type: 'link', tag: 'a', className: 'link', text: 'Enlarge image'}
//     ],
//     items: 10,
//     buffer: 5,
//     startAt: 0,
//     startAttributeName: '_start',
//     endAttributeName: '_end',
//     itemHtmlTag: 'div',
//     itemClassName: 'card',
//     threshold: 1.0,
//     loader: true,
//     loaderClassName: 'loader',
//     loaderText: 'Loading...',
//     requestsLimit: 3,
//     requestsLimitTimeout: 5000,
// });