import * as sw from "snoowrap"

export default class SnooShelf {
  
  private _name;
  
  constructor() {
    this._name = 'SnooShelf'
  }

  public run() {
      console.log(sw)
      return this._name
  }
}