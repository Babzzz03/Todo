
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Todo from './Todo';
import Navbar from './Navbar';
import EditTodo from './EditTodo';
import Login from './Login';
import Register from './Register';

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/edit">
          <EditTodo />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          
          <Todo />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
