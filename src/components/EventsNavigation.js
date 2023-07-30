import classes from './EventsNavigation.module.css';
import { NavLink , useRouteLoaderData} from 'react-router-dom' ;

function EventsNavigation() {
  const token = useRouteLoaderData('root'); 
  //--------------------------------------
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to='' className={({isActive})=> isActive? classes.active : undefined } end >All Events</NavLink>
          </li>
          { token &&
          <li>
            <NavLink to='new' relative='route' className={({isActive})=> isActive? classes.active : undefined } >New Event</NavLink>
          </li>
          }
        </ul>
      </nav>
    </header>
  );
}

export default EventsNavigation;
