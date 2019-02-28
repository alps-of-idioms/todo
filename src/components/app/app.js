import React from "react";
import AppHeader from "../app-header";
import SearchPanel from "../search-pannel";
import TodoList from "../todo-list";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";

import "./app.css";

export default class App extends React.Component {
  state = {
    todoData: [],
    term: "",
    filter: "" // active, all, done
  };

  createTodoItem(label, ndx) {
    return {
      label,
      important: false,
      done: false,
      id: +new Date() + Math.floor(Math.random() * 100)
    };
  }

  search = (items, term) => {
    if (term.length === 0) {
      return items;
    }
    return items.filter(
      item => item.label.toLowerCase().indexOf(term.toLowerCase()) > -1
    );
  };

  filter = (items, filter) => {
    switch (filter) {
      case "all":
        return items;
      case "active":
        return items.filter(item => item.done === false);
      case "done":
        return items.filter(item => item.done === true);
      default:
        return items;
    }
  };

  onSearchChange = term => {
    this.setState({
      term
    });
  };

  onFilterChange = filter => {
    this.setState({
      filter
    });
  };

  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filter(this.search(todoData, term), filter);
    const todo = this.state.todoData.filter(item => item.done === false).length;
    return (
      <div className="todo-app">
        <AppHeader todo={todo} done={this.state.todoData.length - todo} />
        <div className="top-panel d-flex">
          <SearchPanel searchField={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>

        <TodoList
          todos={visibleItems}
          onDeleted={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <ItemAddForm addItem={this.addItem} />
      </div>
    );
  }
  /*
  handleSearch = text => {
    if (text.length === 0) {
      return this.state.todoData;
    }
    this.setState(({ todoData }) => {
      let lowerText = text.toLowerCase();
      let cloneArr = todoData
        .slice()
        .filter(item => item.label.toLowerCase().indexOf(lowerText) !== -1);
      return {
        todoData: cloneArr
      };
    });
    console.log(text);
  };
*/
  toggleProperty(arr, id, propName) {
    const indx = arr.findIndex(el => el.id === id);
    const oldItem = arr[indx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    const before = arr.slice();
    before.splice(indx, 1, newItem);
    return before;
  }

  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "important")
      };
    });
  };

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, "done")
      };
    });
  };

  addItem = text => {
    this.setState(({ todoData }) => {
      let curState = todoData.slice();
      curState.push(this.createTodoItem(text, 3));
      return {
        todoData: curState
      };
    });
  };

  deleteItem = id => {
    this.setState(({ todoData }) => {
      const indx = todoData.findIndex(el => el.id === id);
      const before = todoData.slice();
      before.splice(indx, 1);
      return {
        todoData: before
      };
    });
  };
}
