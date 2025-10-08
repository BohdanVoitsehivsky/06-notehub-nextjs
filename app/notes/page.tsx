import { fetchNotes } from "@/lib/api";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import Notes from "./Notes.client";


const NotesPage = async () => {
    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey:["notes", 1, 12, ""],
        queryFn: ()=> fetchNotes(1,12, "")
    });
    
  return (

    <HydrationBoundary state={dehydrate(queryClient)}>

        <Notes/>
    </HydrationBoundary>
  )
}

export default  NotesPage