
'use client'

import css from "./Notes.module.css"
import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";
import SearchBox from "@/components/SearchBox/SearchBox";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes  } from "@/lib/api";
import type {FetchNotesResponse} from "@/lib/api";

const Notes = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch(searchInput);
      setPage(1); 
    }, 500); 

    return () => clearTimeout(handler);
  }, [searchInput]);
  
  const perPage = 12;
  const {data, isLoading, error} = useQuery<FetchNotesResponse>({
    queryKey: ["notes", page, perPage, search],
    queryFn: ()=> fetchNotes(page, perPage, search),
    placeholderData: keepPreviousData,
  })
  const totalPages = data?.totalPages ?? 0;

  return (
    
    <div className={css.app}>
	<header className={css.toolbar}>
		<SearchBox onSearch={setSearchInput } />
     

   
{totalPages > 1 && (
<Pagination
 pageCount={totalPages}
  currentPage={page}
   onPageChange={setPage} />
)}


    <button
     className={css.button}
      onClick={()=> setIsModalOpen(true)}>
      Create note +
      </button>
      </header>
		
  

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <NoteList notes={data.notes} />}
      {data && data.notes.length === 0 && <p>No notes found.</p>}


{isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <NoteForm onClose={() => setIsModalOpen(false)} />
          </Modal>
        )}

</div>

   
  )
}

export default Notes