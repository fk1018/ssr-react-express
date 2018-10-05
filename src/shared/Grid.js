import React, { Component } from 'react';

class Grid extends Component {
  render() {
    const repos = this.props.data;
    return (
      <ui style={{ display: 'flex', flexWrap: 'wrap' }}>
        {repos.map(({
          name, owner, stargazersCount, htmlUrl,
        }) => (
          <li key={name} style={{ margin: 30 }}>
            <ul>
              <li><a href={htmlUrl}>{name}</a></li>
              <li>
                @
                {owner.login}
              </li>
              <li>{stargazersCount}</li>
            </ul>
          </li>
        ))}
      </ui>
    );
  }
}

export default Grid;
