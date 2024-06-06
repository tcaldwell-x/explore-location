import { NextResponse } from 'next/server';
import { getPosts } from '../../lib/posts';
import { getUsers } from '../../lib/users';

const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
        chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
}

const getAllUsers = async (userIds) => {
    const chunks = chunkArray(userIds, 100);
    const promises = chunks.map(chunk => getUsers(chunk));
    const results = await Promise.all(promises);
    return results.flat();
}

const processPosts = (posts) => {
    const postData = posts.map(post => ({
        ...post,
        engagement: post.public_metrics.retweet_count +
                    post.public_metrics.reply_count +
                    post.public_metrics.like_count +
                    post.public_metrics.quote_count +
                    post.public_metrics.bookmark_count +
                    post.public_metrics.impression_count
    }));

    const sortedPosts = postData.sort((a, b) => b.engagement - a.engagement);

    const userCounts = {};
    const annotationCounts = {};
    const userEngagementCounts = {};
    const users = {};
    const annotations = {};

    postData.forEach(post => {
        // Count and aggregate mentions
        if (post.entities && post.entities.mentions) {
            post.entities.mentions.forEach(mention => {
                if (!users[mention.id]) {
                    users[mention.id] = mention;
                }
                userCounts[mention.id] = (userCounts[mention.id] || 0) + 1;
            });
        }

        // Count and aggregate annotations
        if (post.entities && post.entities.annotations) {
            post.entities.annotations.forEach(annotation => {
                if (!annotations[annotation.normalized_text]) {
                    annotations[annotation.normalized_text] = annotation;
                }
                annotationCounts[annotation.normalized_text] = (annotationCounts[annotation.normalized_text] || 0) + 1;
            });
        }

        // Count user engagement
        const authorId = post.author_id;
        userEngagementCounts[authorId] = (userEngagementCounts[authorId] || 0) + post.engagement;
    });

    const mostMentionedUsers = Object.entries(userCounts).sort((a, b) => b[1] - a[1]).map(([userId, count]) => ({
        user: userId,
        mentions: count
    }));
    const popularTopics = Object.entries(annotationCounts).sort((a, b) => b[1] - a[1]).map(([annotation, count]) => annotation);
    const mostPopularUsers = Object.entries(userEngagementCounts).sort((a, b) => b[1] - a[1]).map(([userId, count]) => ({
        user: userId,
        engagement: count
    }));

    return {
        sortedPosts,
        mostMentionedUsers,
        popularTopics,
        mostPopularUsers
    };
}

export async function GET(req) {
  const queryParams = req.nextUrl.searchParams;
  const maxPages = 10;

  if (queryParams.get('query')) {
    const posts = await getPosts(queryParams.get('query'), maxPages);
    const result = processPosts(posts);
    const combinedUsers = result.mostMentionedUsers.concat(result.mostPopularUsers);
    const userIds = combinedUsers.filter(entry => typeof entry.user === 'string').map(entry => entry.user);
    const users = await getAllUsers(userIds);
    const userIdMap = users.reduce((map, item) => {
        map[item.id] = item;
        return map;
    }, {});
  
    const updatedMostMentionedUsers = result.mostMentionedUsers.map(item => {
        if (userIdMap[item.user]) {
            return Object.assign({} , item, userIdMap[item.user]);
        }
        return item;
    });
    const updatedMostPopularUsers = result.mostPopularUsers.map(item => {
        if (userIdMap[item.user]) {
            return Object.assign({} , item, userIdMap[item.user]);
        }
        return item;
    });

    return NextResponse.json({
        posts: result.sortedPosts,
        topics: result.popularTopics,
        mentionedUsers: updatedMostMentionedUsers,
        popularUsers: updatedMostPopularUsers
     });
  }
  return NextResponse.json({ error: 'Missing query parameters', success: false });
}
