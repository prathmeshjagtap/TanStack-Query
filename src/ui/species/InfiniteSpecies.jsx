import { useInfiniteQuery } from "@tanstack/react-query";
import InfiniteScroll from "react-infinite-scroller";
import { Species } from "./Species";

const initialUrl = "https://swapi.dev/api/species/";
const fetchUrl = async (url) => {
	const response = await fetch(url);
	return response.json();
};

function InfiniteSpecies() {
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isLoading,
		isFetching,
		error,
		isError,
	} = useInfiniteQuery(
		["infiniteSpecies"],
		({ pageParam = initialUrl }) => fetchUrl(pageParam),
		{ getNextPageParam: (lastPage) => lastPage.next || undefined }
	);

	if (isLoading) return <div className="loading">Loading...</div>;
	if (isError) return <div>Error! {error.toString()}</div>;
	return (
		<InfiniteScroll hasMore={hasNextPage} loadMore={fetchNextPage}>
			<>
				{isFetching && <div className="loading">Loading...</div>}
				<InfiniteScroll loadMore={fetchNextPage} hasMore={hasNextPage}>
					{data.pages.map((pageData) => {
						return pageData.results.map((species) => {
							return (
								<Species
									key={species.name}
									name={species.name}
									language={species.language}
									averageLifespan={species.averageLifespan}
								/>
							);
						});
					})}
				</InfiniteScroll>
			</>
		</InfiniteScroll>
	);
}
export { InfiniteSpecies };
