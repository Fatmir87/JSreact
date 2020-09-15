import React, { Component } from "react";
import Todos from "./Todos";
import "./App.css";

class App extends Component {
  state = {
    todos: [
      {
        id: 1,
        title: "Städa",
        completed: false,
      },
      {
        id: 2,
        title: "Handla",
        completed: false,
      },
      {
        id: 3,
        title: "Diska",
        completed: false,
      },
    ],
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
    console.log(id);
  };
  render() {
    return (
      <div className="App">
        <Todos todos={this.state.todos} markCompleteProp={this.markComplete} />
      </div>
    );
  }
}

export default App;
