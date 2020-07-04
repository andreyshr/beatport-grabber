import getRelease from './get-release';
import getTrack from './get-track';
import getChart from './get-chart';
import saveItem from "./save-item";

chrome.contextMenus.create({
    title: "Add release to wishlist",
    contexts:["page", "selection", "image", "link"],
    documentUrlPatterns: ["http://www.beatport.com/release/*", "https://www.beatport.com/release/*"],
    id: 'ADD_RELEASE',
    onclick: clickHandler.bind(this, getRelease, saveItem),
});

chrome.contextMenus.create({
    title: "Add track to wishlist",
    contexts:["page", "selection", "image", "link"],
    documentUrlPatterns: ["http://www.beatport.com/track/*", "https://www.beatport.com/track/*"],
    id: 'ADD_TRACK',
    onclick: clickHandler.bind(this, getTrack, saveItem),
});

chrome.contextMenus.create({
    title: "Add chart to wishlist",
    contexts:["page", "selection", "image", "link"],
    documentUrlPatterns: ["http://www.beatport.com/chart/*", "https://www.beatport.com/chart/*"],
    id: 'ADD_CHART',
    onclick: clickHandler.bind(this, getChart,saveItem),
});

function clickHandler(code, cb) {
    chrome.tabs.query({active: true}, function(tabs) {
        const tab = tabs[0];
        chrome.tabs.executeScript(tab.id, {
            code
        }, cb);
    });
}
