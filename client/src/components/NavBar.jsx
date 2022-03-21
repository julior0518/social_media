
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdAdd, IoMdSearch } from 'react-icons/io'


const NavBar = ({ searchTerm, setSearchTerm, user }) => {
    console.log(user)
    const navigate = useNavigate()
    // if (!user) return null;
    return (
        <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
            <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm'>
                <IoMdSearch fontSize={21} className='ml-1' />
                <input type="text" onChange={(e) => setSearchTerm(e.target.value)} placeholder="search" value={searchTerm} onFocus={() => navigate('/search')} className="p-2 w-full outline-normal"/>
            </div>
            {!!user ? 
            <div className='flex gap-3'>

                <Link to={`user-profile/${user?._id}`} className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
                    <img src={user?.image} alt="user-image" className='w-14 h-12 rounded-lg'/>
                </Link>
                <Link to={`create-pin`} className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
                    <IoMdAdd />
                </Link>
            
            </div>
            :
            <Link to='/login' className="bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none text-center">
                Login
            </Link>
            }
        </div>
    )
    
}

export default NavBar;