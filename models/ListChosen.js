export class ListChosenItem {
  constructor() {
    this.listArray = new Array();
  }
  addChosenItem = (chosenItem) => {
    this.listArray.push(chosenItem);
  };
}
