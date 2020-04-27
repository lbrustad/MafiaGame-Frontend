import React from "react";
import { randomString } from "../util/string.util";

export default class Login extends React.Component {
  state: states = {
    username: "",
    password: "",
    fetchData: {}
  };

  elements = {
    username: randomString(10),
    password: randomString(10),
    submit: randomString(10)
  };

  constructor(props: Readonly<{}>) {
    super(props);

    this.state = {
      username: "",
      password: "",
      fetchData: null
    };

    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.submit = this.submit.bind(this);
  }

  changeUsername(e: React.ChangeEvent) {
    const el = document.getElementById(this.elements.username);
    if (el !== null && el instanceof HTMLInputElement) {
      this.setState({ username: el.value });
    }
  }

  changePassword = (e: React.ChangeEvent) => {
    const el = document.getElementById(this.elements.password);
    if (el !== null && el instanceof HTMLInputElement) {
      this.setState({ password: el.value });
    }
  };

  async submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("http://localhost/api/login", {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json"
      },
      referrerPolicy: "no-referrer",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    });

    const data: fetchResponse = await res.json();

    console.log(data);
    this.setState({ fetchData: data });

    // remove message after 5 sec
    setTimeout(() => {
      this.setState({ fetchData: null })
    }, 5e3)
  }

  render() {
    let passwd, submit, info;

    if (
      typeof this.state.username === "string" &&
      this.state.username.length >= 2
    ) {
      passwd = (
        <span>
          <br />
          <input
            id={this.elements.password}
            type="password"
            placeholder="Passord"
            defaultValue={this.state.password}
            onChange={this.changePassword}
          />
        </span>
      );
    }

    if (
      typeof this.state.password === "string" &&
      this.state.password.length >= 6
    ) {
      submit = (
        <span>
          <br />
          <input type="submit" value="Logg inn" />
        </span>
      );
    }

    if (typeof this.state.fetchData?.message === "string") {
      info = <p className="error">{this.state.fetchData.message}</p>;
    }

    if (typeof this.state.fetchData?.id === "string") {
      info = (
        <p className="success">{"Laster ID: " + this.state.fetchData.id}</p>
      );
    }

    return (
      <div>
        <h1>Innlogging</h1>
        <form onSubmit={this.submit}>
          <input
            id={this.elements.username}
            type="text"
            placeholder="Brukernavn"
            defaultValue={this.state.username}
            onChange={this.changeUsername}
          />
          {passwd}
          {submit}
        </form>
        {info}
      </div>
    );
  }
}

interface states {
  username: string;
  password: string;
  fetchData?: fetchResponse | null;
}

interface fetchResponse {
  status?: "success" | "failed";
  // success
  id?: string | null;
  // failed
  statusCode?: number;
  message?: string | null;
}
