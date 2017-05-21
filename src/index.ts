import * as redditConfig from "../config/reddit.config.json"
import * as dropboxConfig from "../config/dropbox.config.json"
import { RedditApi } from "./api/redditApi";
import { DropboxApi } from "./api/persistence/dropboxApi";

export class SnooShelf {

  constructor() { }

  public run(): void {
    const api = new RedditApi(redditConfig)
    api.getMySubscriptions().then(val => console.log(val[0].display_name_prefixed))
    api.getMySavedContent().then(val => console.log(val[0].title))
    const persistence = new DropboxApi(dropboxConfig)
    persistence
      .write("test", "{ \"id\": 1, \"name\": \"A green door\", \"price\": 12.50, \"tags\": [\"home\", \"green\"] }")
      .then(val => console.log(val))
    persistence
      .read("test")
      .then(val => console.log(val.fileBinary))
  }
}