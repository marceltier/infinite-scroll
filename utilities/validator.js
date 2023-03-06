export const requiredValidator = value => {
    value.forEach(item => {
        if (item.length === 0) throw new Error(`Required option isn't provided`)
    })
}

export const typeValidator = (value, type) => {
    value.forEach(item => {
        if (typeof item !== type) throw new Error(`${item} is not a ${type}`)
    });
}

export const settingsValidator = settings => {

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