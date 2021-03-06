import { useState, useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom"

import { client } from '../client'
import { feedQuery, searchQuery } from '../utils/data'
import MasonryLayout from './MasonryLayout'
import Search from './Search'
import Spinner from './Spinner'


const Feed = () => {

    const [ loading, setLoading ] = useState (false)
    const { categoryId } = useParams()
    const [ pins, setPins ] = useState (false)

    useEffect(() => {
        if (categoryId) {
            setLoading(true);
            const query = searchQuery(categoryId);
            client.fetch(query).then((data) => {
                setPins(data);
                setLoading(false);
            });
        } else {
            setLoading(true);
    
            client.fetch(feedQuery).then((data) => {
                setPins(data);
                setLoading(false);
            });
        }
    }, [categoryId]);

    if(loading) return <Spinner message="feeding to feed feed" />
    

    if(!pins?.length) return <h2>No posts yet</h2>
    return (
        <div>
            {pins && <MasonryLayout pins={pins}/>}
        </div>
    )
    
}
    
export default Feed;