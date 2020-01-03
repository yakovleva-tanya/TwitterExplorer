import React, { useState } from "react";
import User from "./User";
import getUser from "../scraper.js";

const TwitterApp = () => {
  const [token, setToken] = useState("hVy-g_gjlwhOULmTAGLCIA");
  const [username, setUsername] = useState("proxycrawl");
  const [selectedUser, setSelectedUser] = useState("default");
  const [users, setUsers] = useState([]);
  const [status, setStatus] = useState("");

  const handleChange = event => {
    const { name, value } = event.target;
    if (name === "token") {
      setToken(value);
    } else if (name === "username") {
      setUsername(value);
    }
  };

  const handleSubmit = event => {
    setStatus("loading");
    let promise = getUser(username, token);
    Promise.all([promise]).then(res => {
      let user = res[0];
      if (user.name !== undefined) {
        if (users.find(u => u.name === user.name)) {
          setStatus("User already added");
        } else {
          setUsers([...users, user]);
          setStatus(`Success! User added`);
        }
      } else {
        setStatus(
          "Cannot process your request at this time. please try again later"
        );
      }
    });
    event.preventDefault();
  };

  const convertToInt = num => {
    return parseInt(num.replace(/,/g, ""));
  };

  const openPage = username => {
    setSelectedUser(username);
  };

  const sortBy = type => {
    setUsers(
      [...users].sort(function(x, y) {
        return convertToInt(y[type]) - convertToInt(x[type]);
      })
    );
  };

  const removeUser = username => {
    setUsers(
      users.filter(user => {
        return user.username !== username;
      })
    );
  };

  return (
    <div>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1
            className="display-4"
            onClick={() => {
              openPage("default");
            }}
          >
            Twitter Explorer
          </h1>
          <p className="lead">Easily compare and view twitter users</p>{" "}
        </div>
      </div>
      <div className="container">
        {selectedUser !== "default" && (
          <p
            className="btn btn-dark"
            onClick={() => {
              openPage("default");
            }}
          >
            {`<-- Go Back`}
          </p>
        )}
      </div>
      {selectedUser === "default" ? (
        <div className="container">
          <form onSubmit={handleSubmit}>
            <div className="form-row align-items-center">
              <div className="col-auto">
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">API token:</div>
                  </div>
                  <input
                    value={token}
                    onChange={handleChange}
                    name="token"
                    type="password"
                    className="form-control"
                    id="inlineFormInputGroup"
                  />
                </div>
              </div>
              <div className="col-auto">
                <label className="sr-only" for="inlineFormInputGroup">
                  Username
                </label>
                <div className="input-group mb-2">
                  <div className="input-group-prepend">
                    <div className="input-group-text">@</div>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="inlineFormInputGroup"
                    value={username}
                    onChange={handleChange}
                    name="username"
                  />
                </div>
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-primary mb-2">
                  Submit
                </button>
              </div>
            </div>
          </form>
          {status !== "" && <p className="alert alert-info">{status}</p>}
          <div>
            <div className="table-responsive">
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <td>Username</td>
                    <td>Full Name</td>
                    <td onClick={() => sortBy("tweets")}>
                      Tweets{" "}
                      <span
                        className="iconify"
                        data-icon="el-chevron-down"
                        data-inline="false"
                      ></span>
                    </td>
                    <td onClick={() => sortBy("following")}>
                      Following{" "}
                      <span
                        className="iconify"
                        data-icon="el-chevron-down"
                        data-inline="false"
                      ></span>
                    </td>
                    <td onClick={() => sortBy("followers")}>
                      Followers{" "}
                      <span
                        className="iconify"
                        data-icon="el-chevron-down"
                        data-inline="false"
                      ></span>
                    </td>
                    <td></td>
                    <td></td>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 &&
                    users.map(user => {
                      return (
                        <tr key={user.username}>
                          <td>@{user.username}</td>
                          <td>{user.name}</td>
                          <td>{user.tweets}</td>
                          <td>{user.following}</td>
                          <td>{user.followers}</td>
                          <td>
                            <button
                              className="btn btn-info"
                              onClick={() => openPage(user.username)}
                            >
                              View
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-light"
                              onClick={() => removeUser(user.username)}
                            >
                              Remove
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <User user={users.find(u => u.username === selectedUser)} />
        </div>
      )}
    </div>
  );
};

export default TwitterApp;
