
import { useState, useEffect } from "react";

import MansoryLayout from './MasonryLayout'
import { client } from "../client";
import { feedQuery, searchQuery } from "../utils/data";
import Spinner from "./Spinner";




const Search = ( { searchTerm }) => {
    const [pins, setPins] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect (() => {
        if(searchTerm){
            setLoading(true) 
            const query = searchQuery(searchTerm.toLowerCase())
            client.fetch(query)
                .then((data)=>{
                    setPins(data)
                    setLoading(false)
                })
        }
            client.fetch(feedQuery)
                .then((data)=>{
                    setPins(data)
                    setLoading(false)
                })
    }, [searchTerm])

    
    return (
        <div>
            {loading && <Spinner message="Searching for your search..."/>}
            {pins?.length !== 0 && <MansoryLayout pins={pins} />}
            {pins?.length === 0 && searchTerm !== '' && !loading && (
                <div className="mt-10 text-cent text-xl">
                    We didn't find anything
                </div>
            )}


        </div>
    )
    
}
    
export default Search;