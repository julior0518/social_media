import { useState, useEffect} from 'react'
import { useParams } from "react-router-dom"

import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'


const Feed = () => {

    const [loading, setLoading ] = useState (false)

    if(!loading) return <Spinner message="feeding to feed feed" />
    return (
        <div>
            Feed
        </div>
    )
    
}
    
export default Feed;