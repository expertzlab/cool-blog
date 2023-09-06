
import React from "react";
import Link from "next/link";

async function fetchPosts() {
  const url =
	"http://localhost:3000/posts.json";
  console.log("fetch called");
  const response = await fetch(url, {cache: 'no-store'});

  const data = await response.json();

  return data.posts;
}

export default function AllPostsPage({ posts, lastRenderedTime }) {
  return (
	<>
  	<h1>All Posts</h1>
  	<p>Last rendered time: {lastRenderedTime}</p>
  	<ul>
    	{posts &&
      	posts.map((post) => (
        	<li key={post.id}>
          	<Link href={`/posts/${post.id}`}>{post.title}</Link>
        	</li>
      	))}
  	</ul>
	</>
  );
}

export async function getStaticProps() {
  const posts = await fetchPosts();
  const lastRenderedTime = new Date().toLocaleTimeString();
 
  return {
	props: {
  	posts,
  	lastRenderedTime,
	},
	revalidate: 10
  };
}

    