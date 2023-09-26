import PostsGrid from "./components/posts-grid";
import { getFeaturedPosts } from "./utils/posts-util";

export const revalidate = 30;

export default function Home() {
const featuredPosts = getFeaturedPosts();

return (
<>
<h1>Home Page</h1>
    <PostsGrid posts={featuredPosts} />
</>
);
}
