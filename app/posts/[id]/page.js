
import { MDXRemote } from "next-mdx-remote/rsc";
import Image from "next/image";

import styles from "./posts-detail.module.css";
import { getPostData } from "../../utils/posts-util";

export const revalidate = 30;

export default function PostDetailPage({ params }) {
const { id: postId } = params;

const post = getPostData(postId);

const Responsivelmage = (props) => {
    return (
    <span className={styles.image}>
    <Image src={`/images/posts/${post.slug}/${props.src}`} alt={`${props.alt} `} width={600} height={300} />
    </span>
    );
};

const components = {
    img: Responsivelmage,

};

return (
<>
    <h1>{post.title}</h1>
    <MDXRemote source={post.content} components={components} />
</>
);
}

