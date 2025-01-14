import { SendTweetV2Params, TwitterApi } from "twitter-api-v2";

function loadTwitterClient() {
    return new TwitterApi({
        appKey: process.env.TWITTER_APP_KEY,
        appSecret: process.env.TWITTER_APP_SECRET,
        accessToken: process.env.TWITTER_ACCESS_TOKEN,
        accessSecret: process.env.TWITTER_ACCESS_SECRET,
    });
}

async function postTweet(content: string, tweetV2Params?: Partial<SendTweetV2Params>) {
    try {
        const twitterClient = loadTwitterClient().readWrite;
        const res = await twitterClient.v2.tweet(content, tweetV2Params);
        console.log("send tweet success :", res);
    } catch (error) {
        console.error('Failed post Tweet:', error);
    }
}

async function postTweetThread(tweets: (SendTweetV2Params | string)[]) {
    try {
        const twitterClient = loadTwitterClient().readWrite;
        const res = await twitterClient.v2.tweetThread(tweets);
        console.log("send tweetThread success :", res);
    } catch (error) {
        console.error('Failed post tweetThread:', error);
    }
}

async function fetchUserIdByName(username: string) {
    try {
        const client = loadTwitterClient().readOnly;
        const user = await client.v2.userByUsername(username);
        const userId = user.data.id;
        return userId
    } catch (error) {
        console.error('Error fetching userId:', error);
    }

}

async function fetchUserTweetsByName(username: string, maxResults = 10) {
    try {
        const client = loadTwitterClient().readOnly;

        const user = await client.v2.userByUsername(username);
        const userId = user.data.id;

        const tweets = await client.v2.userTimeline(userId, { max_results: maxResults });
        console.log('User Tweets:', tweets.data);

        return tweets.data;

    } catch (error) {
        console.error('Error fetching tweets:', error);
    }
}

async function fetchUserFollowingByName(username: string, maxResults = 10) {
    try {
        const client = loadTwitterClient().readOnly;
        const user = await client.v2.userByUsername(username);
        const userId = user.data.id;

        const following = await client.v2.following(userId, { max_results: maxResults });
        console.log(`Following list for ${username}:`, following.data);

        return following.data;
    } catch (error) {
        console.error('Error fetching following list:', error);
    }
}

export {
    fetchUserIdByName,
    loadTwitterClient,
    postTweet,
    postTweetThread,
    fetchUserFollowingByName,
    fetchUserTweetsByName
};
