import * as React from "react";
import "./styles.css";

import Login from "./pages/login";

export default class App extends React.Component {
  state: states = {
    page: "login"
  };

  render() {
    switch (this.state.page) {
      case "login":
        return (
          <div className="App login">
            <Login />
          </div>
        );
    }
  }
}

export { App };

interface states {
  page: pages;
}

type pages = "login" | "game" | "about" | "contact";
