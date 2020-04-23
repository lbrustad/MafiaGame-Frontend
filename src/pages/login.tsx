import React from "react";
import { randomString } from "../util/string.util";

export default class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };

  render() {
    const elements = {
      username: randomString(10),
      password: randomString(10)
    };
    let passwd;

    const changeUsername = (e: React.ChangeEvent) => {
      const el = document.getElementById(elements.username);
      if (el !== null && el instanceof HTMLInputElement) {
        this.setState({ username: el.value });
      }
    };

    const changePassword = (e: React.ChangeEvent) => {
      const el = document.getElementById(elements.password);
      if (el !== null && el instanceof HTMLInputElement) {
        this.setState({ password: el.value });
      }
    };

    const submit = () => {
      //
      return false;
    };

    if (
      typeof this.state.username === "string" &&
      this.state.username.length >= 6
    ) {
      passwd = (
        <input
          id={elements.password}
          type="password"
          placeholder="Passord"
          defaultValue={this.state.password}
          onChange={changePassword}
        />
      );
    }

    return (
      <div>
        <p>Login Page</p>
        <form onSubmit={submit}>
          <input
            id={elements.username}
            type="text"
            placeholder="Brukernavn"
            defaultValue={this.state.username}
            onChange={changeUsername}
          />
          {passwd}
        </form>
      </div>
    );
  }
}
