function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}

const cleanHTMLMap = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
};
function cleanHTML(input) {
    if (typeof input !== 'string') return input;
    return input.replace(/[&<>"']/g, function(match) {
        return cleanHTMLMap[match];
    });
}

/**
 * @type {Map<string, HTMLElement>}
 */
const HTMLElements = new Map();

function stringClean(strings, args) {
    let result = '';

    for (let i = 0; i < strings.length; i++) {
        if (strings[i][strings[i].length - 1] == "/"){
            const substring = strings[i].substring(0, strings[i].length - 1);
            if (substring != false) {
                result += substring;
            }
        } else {
            result += strings[i];
        }

        if (args[i] instanceof HTMLElement) {
            const key = `element-${HTMLElements.size.toString()}`;
            const placeholderElement = /*html*/`<div class="placeholder" id="${key}">loading</div>`;
            HTMLElements.set(key, args[i]);
            result += placeholderElement;
            continue
        }

        if (args[i] instanceof Function) {
            const functionKey = `functions[${functions.length}]()`;
            functions.push(args[i]);
            result += functionKey;
            continue
        }

        if (i < args.length) {
            if (strings[i][strings[i].length - 1] == "/"){
                result += args[i];
            } else {
                result += cleanHTML(args[i]);
            }
        }
    }

    return result;
}

function html(strings, ...args) {
    const htmlString = stringClean(strings, args);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString.trim();
    return tempDiv.firstChild;
}