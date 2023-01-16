import { useState, useEffect } from "react";
import { PostDetail } from "../PostDetails/PostDetail";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const maxPostPage = 10;

async function fetchPosts(currentPage) {
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${currentPage}`
	);
	return response.json();
}

function Posts() {
	const queryClient = useQueryClient();
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedPost, setSelectedPost] = useState(null);

	const { data, isLoading, isError, error } = useQuery(
		["posts", currentPage],
		() => fetchPosts(currentPage),
		{
			keepPreviousData: true,
			staleTime: 2000,
		}
	);

	useEffect(() => {
		if (currentPage < maxPostPage) {
			const nextpage = currentPage + 1;
			queryClient.prefetchQuery(["posts", nextpage], () =>
				fetchPosts(nextpage)
			);
		}
	}, [currentPage, queryClient]);

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
				<button
					disabled={currentPage <= 1}
					onClick={() => {
						setCurrentPage((currentPage) => currentPage - 1);
					}}
				>
					Previous page
				</button>
				<span>Page {currentPage}</span>
				<button
					disabled={currentPage >= maxPostPage}
					onClick={() => {
						setCurrentPage((currentPage) => currentPage + 1);
					}}
				>
					Next page
				</button>
			</div>
			<hr />
			{selectedPost && <PostDetail post={selectedPost} />}
		</>
	);
}

export { Posts };
