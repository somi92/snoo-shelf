import { Promise } from "es6-promise"
import * as redditConfig from "../config/reddit.config.json"
import * as dropboxConfig from "../config/dropbox.config.json"
import { RedditApi } from "./api/redditApi";
import { DropboxApi } from "./api/persistence/dropboxApi";

export class SnooShelf {

  private _dropboxApi: DropboxApi
  private _redditApi: RedditApi

  private _tags: Tag[]
  private _subs: Category[]
  private _posts: Post[]

  constructor() {
    this._dropboxApi = new DropboxApi(dropboxConfig)
    this._redditApi = new RedditApi(redditConfig)
  }

  public fetchShelf(): Promise<boolean> {
    const subsPromise = this._redditApi.getMySubscriptions()
    const postsPromise = this._redditApi.getMySavedPosts()
    const tagsPromise = this._dropboxApi.read("TAGS")
    const taggedPostsPromise = this._dropboxApi.read("TAGGED_POSTS")
    return Promise.all([subsPromise, postsPromise, tagsPromise, taggedPostsPromise])
      .then(results => true)
      .catch(error => {
        throw new Error(error)
      })
  }

  /**
   * testing...
   */
  public run(): void {
    const api = new RedditApi(redditConfig)
    api.getMySubscriptions().then(val => console.log(val[0].display_name_prefixed))
    api.getMySavedPosts().then(val => console.log(val[0].title))
    const persistence = new DropboxApi(dropboxConfig)
    persistence
      .write("test", "{ \"id\": 1, \"name\": \"A green door\", \"price\": 12.50, \"tags\": [\"home\", \"green\"] }")
      .then(val => console.log(val))
    persistence
      .read("test")
      .then(val => console.log(val.fileBinary))
  }
}