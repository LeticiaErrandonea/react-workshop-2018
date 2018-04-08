import React, { Component } from 'react';
import './Card.css';

class Card extends Component {
  render() {
    return (
      <div className="Card">
        <div className="Card-details">
          <span className="Card-title">{this.props.title}</span>
        </div>
      </div>
    );
  }
}

export default Card;
