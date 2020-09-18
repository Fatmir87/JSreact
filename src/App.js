import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
import Todos from "./Todos";
import "./App.css";
import AddTodo from "./AddTodo";
import About from "./About";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

class App extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    axios
      .get("https://jsonplaceholder.typicode.com/todos?_limit=10")
      .then((res) => this.setState({ todos: res.data }));
  }

  deleteTodo = (id) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then((res) =>
        this.setState({
          todos: this.state.todos.filter((todo) => todo.id !== id),
        })
      );
  };

  // Toggle Complete
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };

  addTodo = (title) => {
    axios
      .post("https://jsonplaceholder.typicode.com/todos", {
        title,
        id: uuidv4(),
        completed: false,
      })
      .then((res) => {
        this.setState({ todos: [...this.state.todos, res.data] });
      });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Route
            exact
            path="/"
            render={(props) => (
              <React.Fragment>
                <AddTodo addTodo={this.addTodo} />
                <Todos
                  todos={this.state.todos}
                  markCompleteProp={this.markComplete}
                  deleteTodoProp={this.deleteTodo}
                />
              </React.Fragment>
            )}
          />
          <Route path="/" component={About} />
        </div>
      </Router>
    );
  }
}

export default App;
