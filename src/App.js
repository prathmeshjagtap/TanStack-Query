import "./App.css";
import { Posts } from "./ui/Posts/Posts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { InfinitePeople } from "./ui/people/InfinitePeople";
import { InfiniteSpecies } from "./ui/species/InfiniteSpecies";

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="App">
				{/* <Posts /> */}
				<h1>Infinite SWAPI</h1>
				{/* <InfinitePeople /> */}
				<InfiniteSpecies />
			</div>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

export default App;
