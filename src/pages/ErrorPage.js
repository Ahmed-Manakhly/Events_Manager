import PageContent from '../components/PageContent' ;
import { useRouteError } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

//----------------------------------------------------
const ErrorPage = () => { 
    //---------------------------------------
    const error = useRouteError() ;
    let title = 'An Error Occurred!' ;
    let message = 'Something Went Wrong!' ;
    if (error.status === 500 ){ message = error.data.message ;};
    if (error.status === 404 ){ message = 'could not find resources or pages!';  title = 'not found!' ;}

    //--------------------------------------
    return (
        <>
            <MainNavigation/>
            <main>
                <PageContent title={title}>
                    <p>{message}</p>
                </PageContent>
            </main>
        </>
    )} ;
export default ErrorPage ;