import { fieldUpdate } from "./autoFill";

chrome.action.onClicked.addListener((tab) => {
  const field: string = "#fieldInput1";
  let value: string = "asasd";
  chrome.scripting
    .executeScript({
      target: { tabId: tab.id ? tab.id : -1 },
      func: fieldUpdate,
      args: [field, value],
    })
    .then();
});
