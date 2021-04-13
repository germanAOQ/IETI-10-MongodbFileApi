import React, { useState } from "react";
import "./UserList.css";

class UserList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <table>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
          {this.props.lista.map((elemento) => (
            <tr>
              <td>{elemento.name}</td>
              <td>{elemento.email}</td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}

export default UserList;
