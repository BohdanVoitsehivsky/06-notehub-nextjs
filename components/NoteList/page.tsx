import {  useMutation,  useQueryClient } from "@tanstack/react-query"
import { deleteNote } from "@/lib/api"
import css from "./NoteList.module.css"
import type { Note  } from "../../types/note";
import Link from "next/link";




interface NoteListProps {
  notes: Note[]
}
const NoteList = ({notes}: NoteListProps) => {
  


  const queryClient = useQueryClient();


  


  
  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess:()=> {
      queryClient.invalidateQueries({queryKey: ["notes"]});
    },
  });


 


  return(
    <>
    

    <ul className={css.list}>
	{notes.map((note:Note)=> (
  <li key={note.id} className={css.listItem}>
    <h2 className={css.title}>{note.title}</h2>
    <p className={css.content}>{note.content}</p>
    <div className={css.footer}>
      <span className={css.tag}>{note.tag}</span>

      <div className="{css.actions}" >
        <Link href={`/notes/${note.id}`} className={css.button}>
      View details
      </Link>
      <button className={css.button} onClick={()=> mutation.mutate(note.id!)}>
        Delete
        </button>
        </div>
    </div>
  </li>
  ))}
</ul>

</>
  )
}

export default NoteList