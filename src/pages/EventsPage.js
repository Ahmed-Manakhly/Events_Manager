import EventsList from '../components/EventsList';
import {useLoaderData , json ,defer , Await} from 'react-router-dom' ;
import { Suspense } from 'react';

function EventsPage() {
    const {events} = useLoaderData() ;
    //-------------------------------------------------------------------
    return (
        <Suspense fallback={<p style={{textAlign : 'center'}}>Loading...</p>}>
            <Await resolve={events}>{(loadedEvents) => <EventsList events={loadedEvents} />}</Await>
        </Suspense>
    );
}

export default EventsPage;
//---------------------------------------------------------------------------------
async function loadeEvents() {
    const response = await fetch('http://localhost:8080/events');
    if (!response.ok) {
        throw json({message: 'could not fetch events'} , {status : 500}) ;
    } else {
        const resData = await response.json() ;
        return resData.events ;
    }
}
//--------------------------------------------------
export  function loader() {
    return defer({events : loadeEvents()}) ;
} ;