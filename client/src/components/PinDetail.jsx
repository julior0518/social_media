import { useEffect, useState } from "react";
import { MdDownloadForOffline } from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

import { client, urlFor } from "../client";
import MasonryLayout from './MasonryLayout'
import {pinDetailMorePinQuery, pinDetailQuery} from '../utils/data'
import Spinner from "./Spinner";
import { IoMdHeartEmpty } from "react-icons/io";


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

    const addComment = () => {
        if (comment) {
            setAddingComment(true);

            client
            .patch(pinId)
            .setIfMissing({ comments: [] })
            .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
            .commit()
            .then(() => {
                fetchPinDetails();
                setComment('');
                setAddingComment(false);
            });
        }
    };
    
    return (
        <>
        <div className="flex xl-flex-row flex-col m-auto bg-white" style={{maxWidth: '1500px', borderRadius:'32px'}}>
            <div className="flex justify-cente items-center md:items-start flex-initial">
                <img src={pinDetails?.image && urlFor(pinDetails.image).url()} className="rounded-t-3xl rounded-b-lg" alt="user-post"/>
            </div>
            <div className="w-full p-5 flex-1 xl:min-w-620">
                <div className="flex items-center justify-start">
                    <div className="flex gap-2 items-center">
                        <a href={`${pinDetails.image?.asset?.url}?dl=`} download onClick={(e) => e.stopPropagation()} className="bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none">
                            <MdDownloadForOffline />
                        </a>
                    </div>
                    <a href={pinDetails.destination} target="_blank" rel="noreferer" className="bg-white flex items-center gap-2 text-black justify-center font-bold p-1.5 pl4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md">
                        {pinDetails.destination.length > 18 ? pinDetails.destination.slice(8,35) : pinDetails.destination.slice(8)}
                    </a>
                </div>
                <h1 className="text-4xl font-bold  breake-words mt-3"> {pinDetails.title} </h1>
                <p className="mt-3">{pinDetails.about}</p>
                <Link to={`user-profile/${pinDetails.postedBy?._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg">
                    <img className="w-8 h-8 rounded-full object-cover" src={pinDetails.postedBy?.image} alt="user-profile" />
                    <p className="font-semibold capitalize"> {pinDetails.postedBy?.userName} </p>
                </Link>
                <h2 className="mt-5 text-2xl">Comments</h2>
                <div className="max-h-370 overflow-y-auto">
                    {pinDetails.comments?.map((c ,i) => (
                        <div className="flex gap-2 mt-5 items-center bg-white rounde-lg" key={i}>
                            <img src={c.postedBy.image} alt="user-profile" className="w-10 h-10 rounded-full cursor-pointer"/>
                            <div className="felx flex-col"> 
                                <p className="font-bold">{c.postedBy.userName}</p>
                                <p>{c.comment}</p>
                            </div>

                        </div>
                    ))}
                </div>
                {user
                ? 
                <div className="flex flex-wrap mt-6 gap-3 justify-center items-center">
                    <Link to={`user-profile/${pinDetails.postedBy?._id}`} >
                        <img className="w-8 h-8 rounded-full cursor-pointer" src={pinDetails.postedBy?.image} alt="user-profile" />
                    </Link>
                    <input className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300" type="text" placeholder="Add a comment" value={comment ? comment : ''} onChange={(e) => setComment(e.target.value)}></input>
                    <button onClick={addComment} type="button" className="bg-red-400 text-white rounded-full px-6 py-2 font-seibold text-base outline-none">
                        {addingComment ? 'Posting the comment...' : 'Post'}
                    </button>
                </div>
                : <Link to="/login">
                    <p className="pt-2 cursor-pointer hover:underline" >Login to leave a comment</p>
                </Link>}
                
            </div>
        </div>
        {pins?.length > 0 ? (
            <>
                <h2 className="text-center font-bold text-2x mt-8 mb-2">
                    More like this
                </h2>
                <MasonryLayout pins={pins} />
            </>
        ) : (
            pins?.length === 0 
            ? null
            : <Spinner message="Loading related stuff and things"/>
        )}
        </>
    )
}
    
export default PinDetail; 