import * as snoowrap from "snoowrap"

export class RedditApi {

    private readonly _config: IConfig;
    private readonly _snoowrap: any;

    constructor(config: IConfig) {
        this._config = config
        this._snoowrap = new snoowrap({
            userAgent: this._config.userAgent,
            clientId: this._config.clientId,
            clientSecret: this._config.clientSecret,
            username: this._config.username,
            password: this._config.password
        })
    }

    get config(): IConfig {
        return this._config
    }

    public getMySavedContent(): void {
        this._snoowrap.getMe().then(user => user.getSavedContent({ limit: 5000 }).map(post => { return { id: post.id, title: post.title } }).then(console.log))
    }
}