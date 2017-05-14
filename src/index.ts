import * as config from "../config/config.json"
import { RedditApi } from "./api/redditApi";

export class SnooShelf {

  constructor() { }

  public run(): void {
    const api = new RedditApi(config)
    console.log(api.config)
    api.getMySavedContent()
  }
}