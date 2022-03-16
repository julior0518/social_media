import { urlFor } from "../client";

const Pin = ( {pin}) => {

    console.log(pin)

    return (
        <div>
            <img className="rounded-lg w-full" alt="user-post" src={urlFor(pin.image).width(250).url()} />
        </div>
    )
    
}
    
export default Pin;