import React, { Component, ChangeEvent, FormEvent } from "react";
import { randomString } from "../util/string.util";
import { pages } from '../App'

export default class Login extends Component<properties> {
  state: states = {
    username: '',
    password: '',
    fetchData: null,
    signedIn: false
  };

  elements = {
    username: randomString(10),
    password: randomString(10),
    submit: randomString(10)
  };

  constructor(props: properties) {
    super(props);

    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.submit = this.submit.bind(this);
  }

  changeUsername(e: ChangeEvent) {
    const el = document.getElementById(this.elements.username);
    if (el !== null && el instanceof HTMLInputElement) {
      this.setState({ username: el.value });
    }
  }

  changePassword(e: ChangeEvent) {
    const el = document.getElementById(this.elements.password);
    if (el !== null && el instanceof HTMLInputElement) {
      this.setState({ password: el.value });
    }
  };

  async submit(e: FormEvent) {
    e.preventDefault();
    const { username, password } = this.state;
    let data: fetchResponse = {
      status: 'failed',
      statusCode: 401,
      message: `Ugyldig ${username.length <= 2 ? 'brukernavn og ' : ''}passord`
    };

    if ((username + password) === '') {
      data = {
        status: 'success',
        id: 'TEST'
      }
    } else if (password.length >= 6) {
      try {
        const res = await fetch("http://localhost/api/login", {
          method: "POST",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json"
          },
          referrerPolicy: "no-referrer",
          body: JSON.stringify({ username, password })
        });

        data = await res.json();
      } catch (e) {
        data = {
          status: 'failed',
          statusCode: 500,
          message: "Fikk ikke koblet til server"
        }
      }
    }

    console.log(data);
    this.setState({ fetchData: data });

    // remove message after 5 sec
    setTimeout(() => {
      const status = this.state.fetchData?.status;
      this.setState({ fetchData: null });
      if (status === 'success') {
        this.props.changePage('game');
      }
    }, 5e3)
  }

  render() {
    let passwd, submit, info;
    const { username, password, fetchData } = this.state;

    if (username.length >= 2) {
      passwd = (
        <span>
          <br />
          <input
            id={this.elements.password}
            type="password"
            placeholder="Passord"
            defaultValue={password}
            onChange={this.changePassword}
          />
        </span>
      );
    }

    if (password.length >= 6) {
      submit = (
        <span>
          <br />
          <input type="submit" value="Logg inn" />
        </span>
      );
    }

    if (typeof fetchData?.message === "string") {
      info = <p className="error">{fetchData.message}</p>;
    }

    if (typeof fetchData?.id === "string") {
      info = (
        <p className="success">{"Laster ID: " + fetchData.id}</p>
      );
    }

    return (
      <div className={this.props.classNames}>
        <h1>Innlogging</h1>
        <form onSubmit={this.submit}>
          <input
            id={this.elements.username}
            type="text"
            placeholder="Brukernavn"
            defaultValue={username}
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
  signedIn: boolean;
}

interface properties {
  changePage(page: pages): void;
  classNames: string;
}

interface fetchResponse {
  status: "success" | "failed";
  // success
  id?: string | null;
  // failed
  statusCode?: number;
  message?: string | null;
}
