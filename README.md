# RAG-SYS

A JavaScript library for integrating OpenAI and Twitter APIs. This package allows you to generate AI-based tweets, post them to Twitter, and fetch user data seamlessly.

## 📦 Installation

Install the package via npm:

```bash
npm install rag-sys
```

## ⚙️ Configuration

Before using this package, you need to set up the following environment variables in a `.env` file. This file should be located at the root of your project.

### Environment Variables

```env
# OpenAI Configuration
BASE_URL=https://api.openai.com/v1
API_KEY=your-openai-api-key
AI_MODEL=gpt-4

# Twitter API Configuration
TWITTER_APP_KEY=your-twitter-app-key
TWITTER_APP_SECRET=your-twitter-app-secret
TWITTER_ACCESS_TOKEN=your-access-token
TWITTER_ACCESS_SECRET=your-access-secret

```

Make sure to replace the placeholders with your actual OpenAI and Twitter API keys.

## 🚀 Usage

### Import the Library

```javascript
import ragSys from 'rag-sys';
```

### 1. Generate OpenAI Output

Use the `getOpenAIChat` function to generate content based on a user-provided input:

```javascript
const inputContent = "Explain the benefits of using renewable energy.";
const openAIOutput = await ragSys.getOpenAIChat(inputContent);
console.log(openAIOutput);
```

In this example, the input content is passed to the OpenAI API, which processes it and returns a generated output.

### 2. Post a Tweet

To post a single tweet, simply use the `postTweet` function:

```javascript
await ragSys.postTweet("Hello, World! This is my first tweet using AI Agent Project!");
```

This will post the specified text as a tweet on Twitter.

### 3. Post a Tweet Thread

To post multiple tweets as a thread, you can use the `postTweetThread` function:

```javascript
const tweets = [
    "This is the first tweet of the thread.",
    "Here is the second tweet with more details.",
    "Finally, this is the conclusion of the thread."
];
await ragSys.postTweetThread(tweets);
```

This will post a series of tweets in a thread, where each tweet is added in the correct order.

### 4. Fetch User Tweets by Username

To fetch recent tweets from a specific user, use the `fetchUserTweetsByName` function:

```javascript
const username = "elonmusk";
const tweets = await ragSys.fetchUserTweetsByName(username, 5);
console.log(tweets);
```

This will fetch up to 5 recent tweets from the user with the specified username.

### 5. Fetch User's Following List

To fetch a list of accounts a user is following, you can use the `fetchUserFollowingByName` function:

```javascript
const username = "elonmusk";
const following = await ragSys.fetchUserFollowingByName(username, 10);
console.log(following);
```

This will fetch up to 10 accounts that the specified user is following.

### 6. Fetch User ID by Username

To fetch the user ID of a specified username, use the `fetchUserIdByName` function:

```javascript
const username = "elonmusk";
const userId = await ragSys.fetchUserIdByName(username);
console.log(userId);
```

This will fetch the user ID for the specified username.

## 🛠️ Available Functions

| Function                                  | Description                                                       |
|-------------------------------------------|-------------------------------------------------------------------|
| `getOpenAIChat(input)`                    | Generates OpenAI output based on the input.                       |
| `postTweet(content)`                      | Posts a single tweet.                                            |
| `postTweetThread(tweets)`                 | Posts a thread of tweets.                                        |
| `fetchUserTweetsByName(username, maxResults)` | Fetches a user's tweets by their username.                       |
| `fetchUserFollowingByName(username, maxResults)` | Fetches the accounts a user is following.                        |

## 📜 License

This project is licensed under the MIT License. See the LICENSE file for more details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit an issue or pull request in the repository.