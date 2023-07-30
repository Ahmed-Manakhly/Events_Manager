
import {createBrowserRouter , RouterProvider } from 'react-router-dom' ;
import HomePage from './pages/HomePage' ;
import EventsPage ,{loader as eventsLoader }from './pages/EventsPage' ;
import EventDetailPage , {loader as eventDetailsLoader , action as deleteEventAction}from './pages/EventDetailPage' ;
import NewEventPage  from './pages/NewEventPage' ;
import EditEventPage from './pages/EditEventPage' ;
import RootLayout from './pages/RootLayout' ;
import EventRootLayout from './pages/EventRootLayout' ;
import ErrorPage from './pages/ErrorPage' ;
import {action as manipulateEventAction} from './components/EventForm' ;
import NewsletterPage, { action as newsletterAction } from './pages/Newsletter';
import AuthenticationPage , {action as authAction}from './pages/Authentication' ;
import {action as logoutAction}from './pages/Logout' ;
import {tokenLoader }from './util/auth' ;
import {checkAuthLoader} from './util/auth' ;
//------------------------------------------------------------
function App() {
  //--------------------------------------------
  const router = createBrowserRouter([
    {path: '/' , element : <RootLayout/>  , errorElement : <ErrorPage/> , id:'root',loader: tokenLoader,children:[
      {index : true , element : <HomePage/> },
      {path: 'events' , element : <EventRootLayout/> ,children:[
        {index : true, element : <EventsPage/> , loader : eventsLoader },
        {path: ':eveID' ,id : 'event-detail', loader: eventDetailsLoader , children:[
          {index : true, element : <EventDetailPage/> , action: deleteEventAction },
          {path: 'edit' , element : <EditEventPage/> , action : manipulateEventAction , loader : checkAuthLoader }
        ]},
        {path: 'new' , element : <NewEventPage/> , action :manipulateEventAction , loader : checkAuthLoader},
      ] },
      { path: 'auth', element: <AuthenticationPage /> , action : authAction},
      { path: 'newsletter', element: <NewsletterPage />, action: newsletterAction,},
      { path: 'logout', action: logoutAction,},
    ]},
  ])
  //--------------------------------------------------
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
