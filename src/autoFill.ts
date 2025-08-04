export function queryByIDToString(): any {
  const elementsWithId = document!.querySelectorAll("[id]");
  var str = "";
  elementsWithId.forEach((element) => {
    if (element) {
      var currentElement: any = document.getElementById(element.id);
      str += element.id + ":" + currentElement.value + " ";
    }
  });

  return str;
}

export function createMapFromStr(mapStr: any): any {
  var fieldArr = mapStr.split(" ");
  var fieldMap = new Map();
  fieldArr.forEach((item: any) => {
    if (item) {
      var keyPair = item.split(":");
      fieldMap.set(keyPair[0], keyPair[1]);
    }
  });
  console.log(fieldMap);
  return fieldMap;
}
