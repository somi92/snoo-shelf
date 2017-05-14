import "mocha"
import { expect } from "chai"
import { RedditApi } from "../../src/api/redditApi"

describe("testing RedditApi", () => {

    it("should return correct config", () => {
        const config = {
            username: "testUser",
            password: "testPassword",
            userAgent: "testUserAgent",
            clientId: "testClientId",
            clientSecret: "testClientSecret"
        }
        const api = new RedditApi(config)
        expect(api.config).to.deep.equal(config);
    })
})