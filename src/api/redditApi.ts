import * as snoowrap from "snoowrap"

export class RedditApi {

    private readonly _config: any;
    private readonly _snoowrap: any;

    constructor(config: any) {
        this._config = config
        this._snoowrap = new snoowrap({
            userAgent: this._config.userAgent,
            clientId: this._config.clientId,
            clientSecret: this._config.clientSecret,
            username: this._config.username,
            password: this._config.password
        })
    }

    get config(): any {
        return this._config
    }

    public getMySavedPosts(): Promise<Post[]> {
        return this._snoowrap.getMe()
            .then(user => user.getSavedContent({ limit: 5000 }))
            .then((posts: Post[]) => posts)
    }

    public getMySubscriptions(): Promise<Category[]> {
        return this._snoowrap
            .getSubscriptions({ limit: 100 })
            .then((subs: Category[]) => subs)
    }

    public unsavePost(id: string): Promise<Post> {
        return this._snoowrap
            .getSubmission(id)
            .unsave()
            .then((post: Post) => post)
    }
}