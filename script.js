import infiniteScroll from './infiniteScroll.js';

infiniteScroll({
    url: 'https://jsonplaceholder.typicode.com/posts',
    items: 10,
    startAt: 0,
    startAttributeName: '_start',
    endAttributeName: '_end',
    containerName: 'main',
    itemHtmlTag: 'div',
    itemClassName: 'card',
    threshold: 1.0,
    loader: true,
    loaderClassName: 'loader',
    loaderText: 'Loading...'
});
