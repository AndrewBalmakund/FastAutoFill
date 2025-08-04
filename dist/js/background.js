"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let element = document.getElementById("test");
const autoFill_1 = require("./autoFill");
if (element) {
    element.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            let popupValue = document.getElementById("fieldSelector1");
            let fields = (0, autoFill_1.test)();
            let tab = tabs[0];
            console.log(fields);
            console.log("Popup DOM fully loaded and parsed");
            // Webpage Dom Content
            function modifyDOM(value, fields) {
                console.log(value);
                //console.log("Tab script:");
                //console.log(document.body);
                //var field: any = document.getElementById("fieldInput1");
                //field.value = value;
                console.log(fields);
                var fieldArr = fields.split(" ");
                var fieldMap = new Map();
                fieldArr.forEach((item) => {
                    if (item) {
                        var keyPair = item.split(":");
                        fieldMap.set(keyPair[0], keyPair[1]);
                    }
                });
                console.log(fieldMap);
                var currentFields = document.querySelectorAll("[id]");
                currentFields.forEach((item) => {
                    if (item.id && fieldMap.has(item.id)) {
                        var field = document.getElementById(item.id);
                        console.log(field);
                        field.value = fieldMap.get(item.id).value;
                    }
                });
                return document.body.innerHTML;
            }
            // Popup extension
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: modifyDOM, //argument here is a string but function.toString() returns function's code,
                args: [popupValue.value, fields],
            }, (results) => {
                //Here we have just the innerHTML and not DOM structure
                console.log("Popup script:");
                console.log(results[0]);
            });
        });
    });
}
//# sourceMappingURL=background.js.map