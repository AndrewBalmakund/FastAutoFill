import { queryByIDToString, createMapFromStr } from "./autoFill";

let element = document!.getElementById("test");
if (element) {
  element.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let fields: any = queryByIDToString();
      let tab: any = tabs[0];
      console.log("Popup DOM fully loaded and parsed");

      // Webpage Dom Content
      // Notes: only params can be type string
      function modifyDOM(fields: any) {
        var fieldArr = fields.split(" ");
        var fieldMap = new Map();
        fieldArr.forEach((item: any) => {
          if (item) {
            var keyPair = item.split(":");
            fieldMap.set(keyPair[0], keyPair[1]);
          }
        });

        // Updating corresponding fields from popup extension with webpage content
        var currentFields: any = document.querySelectorAll("[id]");
        currentFields.forEach((item: any) => {
          if (item && fieldMap.has(item.id)) {
            var field: any = document.getElementById(item.id);
            field.value = fieldMap.get(item.id);
          }
        });
        return document.body.innerHTML;
      }

      // Popup extension
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          func: modifyDOM, //argument here is a string but function.toString() returns function's code,
          args: [fields],
        },
        (results) => {
          //Here we have just the innerHTML and not DOM structure
          console.log("Popup script:");
          console.log(results[0]);
        }
      );
    });
  });
}
