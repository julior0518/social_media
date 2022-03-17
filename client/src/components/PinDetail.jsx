import { useEffect, useState } from "react";
import { MdDownloadForOffline } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { client, urlFor } from "../client";
import MasonryLayout from './MasonryLayout'
import {pinDetailMorePinQuery, pinDetailQuery} from '../utils/data'
import Spinner from "./Spinner";


const PinDetail = ({ user }) => {

    const [ pins, setPins ] = useState(null)
    const [ pinDetails, setPinDetails ] = useState(null)
    const [ comment, setComment ] = useState(null)
    const [ addingComment, setAddingComment ] = useState(null)
    // fetched from url beacuse its called on the route
    const {pinId} = useParams()

    const fetchPinDetails = () => {
        let query = pinDetailQuery(pinId)

        if(query){
            client.fetch(query)
            .then((data)=>{
                setPinDetails(data[0]);
/////// our pin and other related pins in one function
                if(data[0]){
                    query = pinDetailMorePinQuery(data[0])
                    
                    client.fetch(query)
                        .then((res) => setPins(res))
                }
            })
        }
    }

    useEffect(()=>{
        fetchPinDetails()
    },[pinId])

    if(!pinDetails) return <Spinner message="Loading post..."/>

    
    return (
        <div>
            PinDetail
        </div>
    )
    
}
    
export default PinDetail;