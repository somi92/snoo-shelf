export declare class Post {
    id: string;
    subreddit_name_prefixed: string;
    view_count: number;
    saved: boolean;
    name: string;
    domain: string;
    hidden: boolean;
    subreddit_id: string;
    ups: number;
    downs: number;
    permalink: string;
    created: number;
    url: string;
    title: string;
    created_utc: number;
    num_comments:number;
    tags: string[];
}

export declare class Tag {
    name: string;
    description: string;
}

export declare class SnooShelf {
    fetchShelf(): Promise<Post[]>;
    saveShelf(): Promise<boolean>;
    tagPost(post: Post, tags: string[]): Post;
    addTag(newTag: Tag): Tag;
    removeTag(tagName: string): void;
}