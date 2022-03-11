import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Splash from "./components/Splash"
import EventPage from './components/EventPage'
import CreateForm from './components/CreateForm'
import EventsList from "./components/EventsList";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className='page-container'>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && (
          <Switch>
            <Route isLoaded={isLoaded} path='/events/create' exact>
              <CreateForm />
            </Route>
            <Route path="/" exact>
              <Splash />
            </Route>
            <Route isLoaded={isLoaded} path="/events/" exact>
              <EventsList />
          </Route>
            <Route path='/events/:id' exact>
              <EventPage />
            </Route>
            <Route path="/signup" exact>
              <SignupFormPage />
            </Route>
            {/* <Route path='*' >
              Page Not Found
            </Route> */}
          </Switch>
        )}
      </div>
    </>
  );
}

export default App;
