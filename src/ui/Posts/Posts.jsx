import { useState } from "react";
import { PostDetail } from "../PostDetails/PostDetail";
import { useQuery } from "@tanstack/react-query";

const maxPostPage = 10;

async function fetchPosts() {
	const response = await fetch(
		"https://jsonplaceholder.typicode.com/posts?_limit=10&_page=0"
	);
	return response.json();
}

function Posts() {
	const [currentPage, setCurrentPage] = useState(0);
	const [selectedPost, setSelectedPost] = useState(null);

	// replace with useQuery
	const { data, isLoading, isError, error } = useQuery(["posts"], fetchPosts);

	if (isLoading) return <div> Loading ....</div>;
	if (isError) {
		return <div>{error.toString()}</div>;
	}

	return (
		<>
			<h1>Blog Posts </h1>
			<ul>
				{data.map((post) => (
					<li
						key={post.id}
						className="post-title"
						onClick={() => setSelectedPost(post)}
					>
						{post.title}
					</li>
				))}
			</ul>
			<div className="pages">
				<button disabled onClick={() => {}}>
					Previous page
				</button>
				<span>Page {currentPage + 1}</span>
				<button disabled onClick={() => {}}>
					Next page
				</button>
			</div>
			<hr />
			{selectedPost && <PostDetail post={selectedPost} />}
		</>
	);
}

export { Posts };
