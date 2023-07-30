import EventItem from '../components/EventItem' ;
import { json , redirect, useRouteLoaderData , defer, Await} from 'react-router-dom' ;
import EventsList from '../components/EventsList';
import {Suspense} from 'react'
import { getAuthToken } from '../util/auth';

//-------------------------------------------
const EventDetailPage =() => {
    const {event , events} = useRouteLoaderData('event-detail') ;
    //-------------------------------------------
    return (
        <>
            <Suspense fallback={<p style={{textAlign : 'center'}}>Loading...</p>}> <Await resolve={event}>{event=> <EventItem event={event}/>}</Await> </Suspense>
            <Suspense fallback={<p style={{textAlign : 'center'}}>Loading...</p>}> <Await resolve={events}>{events => <EventsList events={events}/>}</Await> </Suspense>
        </>
    ) ;
} ;

export default EventDetailPage;
//-----------------------------------------------------------------------NEW
async function loadEvent(id) {
const response = await fetch('https://events-manager-api-e67f.onrender.com/events/' + id);
if (!response.ok) {

    throw json({message: 'could not fetch details for selected event'} , {status : 500}) ;
} else {
    const resData = await response.json() ;
    return resData.event ;
}
}
//----------------------------------------------------- NEW
async function loadeEvents() {
    const response = await fetch('https://events-manager-api-e67f.onrender.com/events');
    if (!response.ok) {
        throw json({message: 'could not fetch events'} , {status : 500}) ;
    } else {
        const resData = await response.json() ;
        return resData.events ;
    }
}
//--------------------------------------------------

export const loader = async ({request , params})=>{
    const id = params.eveID ;

    return defer({events : loadeEvents(), event : await loadEvent(id)} );
} ;

//-----------------------------------------------------------------------

export const action = async ({params , request})=>{
    const id = params.eveID ;
    const token = getAuthToken() ;
    const response = await fetch('https://events-manager-api-e67f.onrender.com/events/' + id , {method : request.method , headers : {'Authorization': 'Bearer ' + token}});
    if (!response.ok) {

        throw json({message: 'could not delete event'} , {status : 500}) ;
    } else {
        return redirect('/events') ;
    }
} ;