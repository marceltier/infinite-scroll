const infiniteScroll = settings => {
    let currentPage = 0;
    const main = document.querySelector(settings.containerName);

    const displayLoader = status => {
        if (!settings.loader) return;
        if (status) {
            const loader = document.createElement('div');
            loader.className = 'card ' + settings.loaderClassName;
            loader.textContent = settings.loaderText;
            main.appendChild(loader);
        }
        if (!status) {
            const loaderEl = document.querySelector(`.${settings.loaderClassName}`);
            const timer = setTimeout(() => main.removeChild(loaderEl), 100);
            return timer;
            // main.removeChild(loaderEl);
        }
        
    }
    
    const loadNextPage = element => {
        currentPage += settings.items;
        const newObserver = new IntersectionObserver(
            function (entries) {
                const [entry] = entries;
                if (!entry.isIntersecting) return;
                requestData(settings, currentPage)
                newObserver.unobserve(element);
            },
            { root: null, threshold: settings.threshold });
        newObserver.observe(element);
    }

    const generateData = (data) => {
        data.forEach((item, i) => {
            const lastItem = i + 1;
            const ddd = item["body"];
            const element = document.createElement(settings.itemHtmlTag);
            element.className = settings.itemClassName;
            const keys = Object.keys(data[i]);
            const values = Object.values(data[i]);
            console.log(data);
            keys.forEach((_, i) => {
                const child = document.createElement('p');
                child.textContent = values[i];

                element.appendChild(child);
            });

            main.appendChild(element);
            if (lastItem === settings.items) {
                loadNextPage(element);
            }
        })
    }

    const requestData = async (settings, currentPage = 0) => {
        try {
            const url = `${settings.url}?${settings.startAttributeName}=${settings.startAt + currentPage}&${settings.endAttributeName}=${settings.items + currentPage}`;
            const request = await fetch(url);
            if(!request.ok) throw new Error(err);
            displayLoader(true);
            const result = await request.json();
            displayLoader(false);
            return generateData(result);
        }
        catch (err) {
            console.error(err);
        }
    }   

    requestData(settings);
}
export default infiniteScroll;