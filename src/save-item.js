import createError from "./create-error";
import showNotification from "./show-notification";

export default function saveItem(result) {
    const item = result[0];
    const { id, type } = item;
    if (typeof id !== 'string' || typeof type !== 'string') return createError();

    chrome.storage.sync.get(id, function (res) {
        if (!res[id]) {
            return chrome.storage.sync.set({[id]: item}, function () {
                const error = chrome.runtime.lastError;
                if (error) return createError(error);
                chrome.tabs.query({active: true}, (tabs) => {
                    const tab = tabs[0];
                    return chrome.tabs.executeScript(tab.id, {
                        code: showNotification(`${type.charAt(0).toUpperCase() + type.slice(1)} successfully added`)
                    });
                });
            });
        }
        return alert(`You have already added this ${type}`);
    });
}
