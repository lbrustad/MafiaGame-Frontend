import React, { Component } from "react";
import "./styles.css";

import Login from "./pages/login";

export default class App extends Component {
  state: states = {
    page: "login"
  };

  constructor(props: Readonly<{}>) {
    super(props);

    this.changePage = this.changePage.bind(this);
  }

  changePage(page: pages) {
    this.setState({ page });
  }

  render() {
    switch (this.state.page) {
      case "login":
        return <Login changePage={this.changePage} classNames="App login" />;
      case "game":
        return (
          <div className="App game">
            <h1>Du er pålogget!</h1>
          </div>
        );
      case "contact":
        return (
          <div className="App contact">
            <h1>Kontakt oss!</h1>
          </div>
        );
      case "about":
        return (
          <div className="App about">
            <h1>Om oss!</h1>
            <p>Jeg er en utvikler alene som har lagd dette spillet!</p>
          </div>
        );
    }
  }
}

interface states {
  page: pages;
}

export type pages = "login" | "game" | "about" | "contact";

export { App };
