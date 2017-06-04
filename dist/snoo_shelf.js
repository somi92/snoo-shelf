(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("dropbox"), require("snoowrap"));
	else if(typeof define === 'function' && define.amd)
		define("snoo_shelf", ["dropbox", "snoowrap"], factory);
	else if(typeof exports === 'object')
		exports["snoo_shelf"] = factory(require("dropbox"), require("snoowrap"));
	else
		root["snoo_shelf"] = factory(root["dropbox"], root["snoowrap"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = {
	"accessToken": "-6gTWWv3WIAAAAAAAAAADfPxr6CzNmhLN40Gm0u0XpzU8R-EF4gy8wi_qfcWLOSr"
};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = {
	"username": "somi92",
	"password": "Marakana@2016",
	"userAgent": "snooshelf:VJ7A0gNGyLsHyw:0.0.1",
	"clientId": "VJ7A0gNGyLsHyw",
	"clientSecret": "ascl0WqNs_Qway0K3eFDGpUTwD4"
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Dropbox = __webpack_require__(5);
var DropboxApi = (function () {
    function DropboxApi(config) {
        this._config = config;
        this._dropbox = new Dropbox({ accessToken: this._config.accessToken });
    }
    DropboxApi.prototype.read = function (id) {
        return this._dropbox.filesDownload({
            path: "/" + id + ".json"
        }).then(function (response) { return response; });
    };
    DropboxApi.prototype.write = function (id, content) {
        return this._dropbox.filesUpload({
            path: "/" + id + ".json",
            contents: content,
            mode: {
                ".tag": "overwrite"
            }
        }).then(function (response) { return response; });
    };
    return DropboxApi;
}());
exports.DropboxApi = DropboxApi;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var snoowrap = __webpack_require__(6);
var RedditApi = (function () {
    function RedditApi(config) {
        this._config = config;
        this._snoowrap = new snoowrap({
            userAgent: this._config.userAgent,
            clientId: this._config.clientId,
            clientSecret: this._config.clientSecret,
            username: this._config.username,
            password: this._config.password
        });
    }
    Object.defineProperty(RedditApi.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    RedditApi.prototype.getMySavedPosts = function () {
        return this._snoowrap.getMe()
            .then(function (user) { return user.getSavedContent({ limit: 5000 }); })
            .then(function (posts) { return posts; });
    };
    RedditApi.prototype.getMySubscriptions = function () {
        return this._snoowrap
            .getSubscriptions({ limit: 100 })
            .then(function (subs) { return subs; });
    };
    RedditApi.prototype.unsavePost = function (id) {
        return this._snoowrap
            .getSubmission(id)
            .unsave()
            .then(function (post) { return post; });
    };
    return RedditApi;
}());
exports.RedditApi = RedditApi;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var redditConfig = __webpack_require__(1);
var dropboxConfig = __webpack_require__(0);
var redditApi_1 = __webpack_require__(3);
var dropboxApi_1 = __webpack_require__(2);
var SnooShelf = (function () {
    function SnooShelf() {
        this._dropboxApi = new dropboxApi_1.DropboxApi(dropboxConfig);
        this._redditApi = new redditApi_1.RedditApi(redditConfig);
        this._tags = [];
        this._taggedPosts = [];
        this._subs = [];
        this._posts = [];
    }
    SnooShelf.prototype.setData = function (data) {
        this._subs = data[0];
        this._posts = data[1];
        this._tags = JSON.parse(data[2].fileBinary);
        this._taggedPosts = JSON.parse(data[3].fileBinary);
        return data;
    };
    SnooShelf.prototype.tagPosts = function () {
        var _this = this;
        var taggedPostIds = this._taggedPosts.map(function (tp) { return tp.postId; });
        taggedPostIds.forEach(function (taggedPostId, ind) {
            var postIndex = _this._posts.indexOf(_this._posts.filter(function (post) { return post.id == taggedPostId; })[0]);
            if (postIndex == -1) {
                _this._taggedPosts.splice(ind, 1);
            }
        });
        this._posts.forEach(function (post) {
            var taggedPost = _this._taggedPosts.filter(function (tp) { return tp.postId == post.id; })[0];
            post.tags = taggedPost ? taggedPost.tags : [];
        });
        return this._posts;
    };
    SnooShelf.prototype.fetchShelf = function () {
        var _this = this;
        var subsPromise = this._redditApi.getMySubscriptions();
        var postsPromise = this._redditApi.getMySavedPosts();
        var tagsPromise = this._dropboxApi.read("TAGS");
        var taggedPostsPromise = this._dropboxApi.read("TAGGED_POSTS");
        return Promise.all([subsPromise, postsPromise, tagsPromise, taggedPostsPromise])
            .then(function (data) { return _this.setData(data); })
            .then(function (_) { return _this.tagPosts(); })
            .catch(function (error) {
            throw new Error(error);
        });
    };
    SnooShelf.prototype.saveShelf = function () {
        var tagsPromise = this._dropboxApi.write("TAGS", JSON.stringify(this._tags));
        var taggedPostsPromise = this._dropboxApi.write("TAGGED_POSTS", JSON.stringify(this._taggedPosts));
        return Promise.all([tagsPromise, taggedPostsPromise])
            .then(function (data) { return true; })
            .catch(function (error) {
            throw new Error(error);
        });
    };
    SnooShelf.prototype.tagPost = function (post, tags) {
        post.tags = tags;
        var taggedPostId = this._taggedPosts.indexOf(this._taggedPosts.filter(function (tg) { return tg.postId == post.id; })[0]);
        if (tags.length == 0) {
            if (taggedPostId > -1)
                this._taggedPosts.splice(taggedPostId, 1);
        }
        else {
            if (taggedPostId > -1) {
                this._taggedPosts[taggedPostId].tags = tags;
            }
            else {
                var newTaggedPost = {
                    postId: post.id,
                    tags: tags
                };
                this._taggedPosts.push(newTaggedPost);
            }
        }
        return post;
    };
    SnooShelf.prototype.addTag = function (newTag) {
        this._tags.push(newTag);
        return newTag;
    };
    SnooShelf.prototype.removeTag = function (tagName) {
        var tagIndex = this._tags.indexOf(this._tags.filter(function (tp) { return tp.name == tagName; })[0]);
        if (tagIndex > -1) {
            this._tags.splice(tagIndex, 1);
        }
    };
    /**
     * testing...
     */
    SnooShelf.prototype.run = function () {
        // const api = new RedditApi(redditConfig)
        // api.getMySubscriptions().then(val => console.log(val[0].display_name_prefixed))
        // api.getMySavedPosts().then(val => console.log(val[0].title))
        // const persistence = new DropboxApi(dropboxConfig)
        // persistence
        //   .write("test", "{ \"id\": 1, \"name\": \"A green door\", \"price\": 12.50, \"tags\": [\"home\", \"green\"] }")
        //   .then(val => console.log(val))
        // persistence
        //   .read("test")
        //   .then(val => console.log(val.fileBinary))
        this.fetchShelf().then(function (posts) { return console.log(posts[0]); });
    };
    return SnooShelf;
}());
exports.SnooShelf = SnooShelf;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ })
/******/ ]);
});
//# sourceMappingURL=snoo_shelf.js.map