"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = test;
function test() {
    const elementsWithId = document.querySelectorAll("[id]");
    var str = "";
    elementsWithId.forEach((element) => {
        if (element) {
            console.log(element.id); // Logs each element's id
            var currentElement = document.getElementById(element.id);
            str += element.id + ":" + currentElement.value + " ";
        }
    });
    return str;
}
//# sourceMappingURL=autoFill.js.map