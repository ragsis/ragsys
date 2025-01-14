import { SendTweetV2Params, TwitterApi } from "twitter-api-v2";
declare function loadTwitterClient(): TwitterApi;
declare function postTweet(content: string, tweetV2Params?: Partial<SendTweetV2Params>): Promise<void>;
declare function postTweetThread(tweets: (SendTweetV2Params | string)[]): Promise<void>;
declare function fetchUserIdByName(username: string): Promise<string>;
declare function fetchUserTweetsByName(username: string, maxResults?: number): Promise<import("twitter-api-v2").TweetV2PaginableTimelineResult>;
declare function fetchUserFollowingByName(username: string, maxResults?: number): Promise<import("twitter-api-v2").UserV2[]>;
export { fetchUserIdByName, loadTwitterClient, postTweet, postTweetThread, fetchUserFollowingByName, fetchUserTweetsByName };
