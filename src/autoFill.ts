export function fieldUpdate(field: string, value: any): void {
  let divElement: any = document.querySelector(field);

  if (divElement) {
    divElement.value = value;
  }
}
