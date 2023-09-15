
import Link from "next/link";
import path from "path";
import mongoose from 'mongoose'
import PostSchema from "../api/models/postSchema";

import fs from "fs";
export const revalidate = 30;

async function fetchPosts() {

    var PostModel = null;
	try{
		PostModel = mongoose.model('Post');
	}catch(err){
		PostModel = mongoose.model('Post', PostSchema)
	}
	const data = await PostModel.find();

    return data;

}

export default async function AllPostsPage() {

const lastRenderedTime = new Date().toLocaleTimeString();

const posts = await fetchPosts();
return (
<>
<h1>All Posts</h1>

<p>Last rendered time: {lastRenderedTime}</p>
<ul>
{posts &&
posts.map((post) => (
<li key={post.slug}>
<Link href={`/posts/${post.slug}`}>{post.title}</Link>
</li>
))}
</ul>

</>

);
}
