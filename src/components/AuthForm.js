// import { useState } from 'react';
import { Form , Link , useActionData, useNavigation, useSearchParams} from 'react-router-dom';

import classes from './AuthForm.module.css';

function AuthForm() {
  //-------------------------------------------------
  const data = useActionData() ;
  const navigation = useNavigation() ;
  const isSubmitting = navigation.state === 'submitting' ;
  //--------------------------------------------------
  const [SearchParams]=useSearchParams() ;
  const isLogin = SearchParams.get('mode') === 'login' ;

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
        {data && data.errors && <ul>{Object.values(data.errors).map(error => <li key={error}>{error}</li>)}</ul>}
        {data && data.message && <p>{data.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>
          <button disabled={isSubmitting}>{isSubmitting? 'Submitting...' : 'Save' }</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
