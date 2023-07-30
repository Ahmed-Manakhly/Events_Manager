import { useNavigate , Form ,useNavigation , useActionData , json , redirect} from 'react-router-dom';

import classes from './EventForm.module.css';
import { getAuthToken } from '../util/auth';
//---------------------------------------------

function EventForm({ method, event }) {
  const navigate = useNavigate();
  //---------------------------------------
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting' ;
  const data = useActionData() ;
  //-----------------------------------------
  function cancelHandler() {
    navigate('..');
  }

  return (
    <Form method={method} className={classes.form}>
      {data && data.errors && (<ul>{Object.values(data.errors).map(err => <li key={err}>{err}</li>)}</ul>)}
      <p>
        <label htmlFor="title">Title</label>
        <input id="title" type="text" name="title" required  defaultValue={event? event.title : ''}/>
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input id="image" type="url" name="image" required defaultValue={event? event.image : ''}/>
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input id="date" type="date" name="date" required defaultValue={event? event.date : ''}/>
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" rows="5" required defaultValue={event? event.description : ''}/>
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting} >
          Cancel
        </button>
        <button disabled={isSubmitting}>{isSubmitting?'submitting...':'Save'}</button>
      </div>
    </Form>
    // </form>
  );
}

export default EventForm;
//-------------------------------
export const action = async ({request , params})=>{
  const method = request.method ;
  // let url = 'https://events-manager-api-e67f.onrender.com/events' ;
  let url = 'https://events-manager-api-e67f.onrender.com/events' ;
  if(method === 'PATCH') {const id = params.eveID ; url = 'https://events-manager-api-e67f.onrender.com/events/'+id ;}
  //------------------------------------------
  const data = await request.formData();
  //---------------------------------------
  const eventData = {title : data.get('title'), image : data.get('image'), date : data.get('date'), description : data.get('description')}
  //--------------------------------------
  const token = getAuthToken() ;
  const response = await fetch(url , {method: method ,headers :{'Content-Type' : 'application/json' , 'Authorization' : 'Bearer ' + token},body: JSON.stringify(eventData)});
  if (response.status ===422) {return response; }
  if (!response.ok) {

      throw json({message: 'could not save event'} , {status : 500}) ;
  }
  return redirect('/events');
} ;