import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import video from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import { client } from '../client'

const Login = () => {
    const navigate = useNavigate()

    async function responseGoogle (response) {
        localStorage.setItem('user', JSON.stringify(response.profileObj))
        
        const { name, googleId, imageUrl } = response.profileObj

        const doc = {
            _id: googleId,
            _type:'user',
            userName: name,
            image: imageUrl
        }

        await client.createIfNotExists(doc)
        
        navigate('/', {replace: true})
    }
    
    return (
        <div className='flex justify-start items-center flex-col h-screen'>  
            <div className='relative w-full h-full '>
                <video 
                    src={video}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className='invisible sm:visible md:visible lg:visible w-full h-full object-cover'
                />
            </div>
            <div className='absolute flex flex-col justify-center items-center top-0 right-0 bottom-0 left-0 bg-blackOverlay'>
                <div className='p-5'>
                    <img src={logo} width="130px" alt="logo" onClick={()=>navigate('/')} />
                </div>
                <div className='sahdow-2x1'>
                    <GoogleLogin 
                        clientId={process.env.REACT_APP_GOOOGLE_API_OAUTH_TOKEN}
                        render={(renderProps)=>(
                            <button
                                type="button"
                                className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                                onClick={renderProps.onClick}
                                disabled={renderProps.disabled}
                            >
                                <FcGoogle className='mr-4'/> Login with Hooli
                            </button>
                        )}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy='single_host_origin'
                    />

                </div>
            </div>
        </div>
    )
}

export default Login