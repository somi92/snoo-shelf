import { Promise } from "es6-promise"
import * as redditConfig from "../config/reddit.config.json"
import * as dropboxConfig from "../config/dropbox.config.json"
import { RedditApi } from "./api/redditApi";
import { DropboxApi } from "./api/persistence/dropboxApi";

export class SnooShelf {

  private _dropboxApi: DropboxApi
  private _redditApi: RedditApi

  private _tags: Tag[]
  private _taggedPosts: TaggedPost[]
  private _subs: Category[]
  private _posts: Post[]

  constructor() {
    this._dropboxApi = new DropboxApi(dropboxConfig)
    this._redditApi = new RedditApi(redditConfig)
  }

  private setData(data: any[]): any[] {
    this._subs = data[0]
    this._posts = data[1]
    this._tags = JSON.parse(data[2].fileBinary)
    this._taggedPosts = JSON.parse(data[3].fileBinary)
    return data
  }

  private tagPosts(): Post[] {
    var taggedPostIds = this._taggedPosts.map(tp => tp.postId)
    taggedPostIds.forEach((taggedPostId: string, ind: number) => {
      var postIndex = this._posts.indexOf(this._posts.filter((post: Post) => post.id == taggedPostId)[0])
      if (postIndex == -1) {
        this._taggedPosts.splice(ind, 1)
      }
    })
    this._posts.forEach((post: Post) => {
      const taggedPost = this._taggedPosts.filter((tp: TaggedPost) => tp.postId == post.id)[0]
      post.tags = taggedPost ? taggedPost.tags : []
    })
    return this._posts
  }

  public fetchShelf(): Promise<Post[]> {
    const subsPromise = this._redditApi.getMySubscriptions()
    const postsPromise = this._redditApi.getMySavedPosts()
    const tagsPromise = this._dropboxApi.read("TAGS")
    const taggedPostsPromise = this._dropboxApi.read("TAGGED_POSTS")
    return Promise.all([subsPromise, postsPromise, tagsPromise, taggedPostsPromise])
      .then(data => this.setData(data))
      .then(_ => this.tagPosts())
      .catch(error => {
        throw new Error(error)
      })
  }

  public tagPost(post: Post, tags: string[]): Post {
    post.tags = tags
    const taggedPostId = this._taggedPosts.indexOf(this._taggedPosts.filter((tg: TaggedPost) => tg.postId == post.id)[0])
    if (tags.length == 0) {
      if (taggedPostId > -1)
        this._taggedPosts.splice(taggedPostId, 1)
    } else {
      if (taggedPostId > -1) {
        this._taggedPosts[taggedPostId].tags = tags
      } else {
        const newTaggedPost: TaggedPost = {
          postId: post.id,
          tags: tags
        }
        this._taggedPosts.push(newTaggedPost)
      }
    }
    return post
  }

  public addTag(newTag: Tag): Tag {
    this._tags.push(newTag)
    return newTag
  }

  public removeTag(tagName: string) {
    const tagIndex = this._tags.indexOf(this._tags.filter((tp: Tag) => tp.name == tagName)[0])
    if (tagIndex > -1) {
      this._tags.splice(tagIndex, 1)
    }
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