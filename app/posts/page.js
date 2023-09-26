
import PostsGrid from "../components/posts-grid";
import { getAllPosts } from "../utils/posts-util";
export const revalidate = 30;

export default function AllPostsPage() {
const posts = getAllPosts();

return (
<>
<h1>All Posts</h1>
	<PostsGrid posts={posts} />
</>
);
}
