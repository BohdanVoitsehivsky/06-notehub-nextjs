import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import css from "./SearchBox.module.css"

interface SearchBoxProps {
    onSearch: (search: string) => void;
}

const SearchBox = ({onSearch}: SearchBoxProps) => {
  const [value, setValue] = useState("");
 const[debouncedValue] = useDebounce(value, 500);

 useEffect(()=> {
    onSearch(debouncedValue);

 }, [debouncedValue, onSearch]);

 return(
   <input
  className={css.input}
  type="text"
  placeholder="Search notes"
  value={value}
  onChange={(event)=> setValue(event.target.value)}
 />

 )
}

export default SearchBox