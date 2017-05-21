const Dropbox = require("dropbox")

export class DropboxApi implements IPersistenceProvider {

    private readonly _config: any;
    private readonly _dropbox: any;

    constructor(config: any) {
        this._config = config
        this._dropbox = new Dropbox({ accessToken: this._config.accessToken })
    }

    public read(id: string): Promise<ReadResponse> {
        return this._dropbox.filesDownload({
            path: `/${id}.json`
        }).then((response: ReadResponse) => response)
    }

    public write(id: string, content: any): Promise<WriteResponse> {
        return this._dropbox.filesUpload({
            path: `/${id}.json`,
            contents: content,
            mode: {
                ".tag": "overwrite"
            }
        }).then((response: WriteResponse) => response)
    }
}