
'use client'

import css from "./Notes.module.css"
import { useState } from "react";
import Pagination from "@/components/Pagination/page";
import NoteList from "@/components/NoteList/page";
import Modal from "@/components/Modal/page";
import NoteForm from "@/components/NoteForm/page";
import SearchBox from "@/components/SearchBox/page";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes  } from "@/lib/api";
import type {FetchNotesResponse} from "@/lib/api";

const Notes = () => {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  
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
		<SearchBox onSearch={(value) => {
      setSearch((prev)=> {
        if(prev !== value) {
          setPage(1)
        }
        return value;
      })
     

    }}/>
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