import React, { Component } from 'react';
import Card from './Card';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      composing: false,
      newCardTitle: ''
    };
  }

  toggleComposer = () => {
    this.setState(prevState => ({
      composing: !prevState.composing
    }));
  }

  newCardTitleChange = (e) => {
    this.setState({
      newCardTitle: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    fetch(`/boards/${this.props.boardId}/lists/${this.props.id}/cards`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        card: {
          text: this.state.newCardTitle
        }
      }),
    }).then((response) => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response;
    }).then((response) => {
      return response.json();
    }).then((card) => {
      this.toggleComposer();
      this.setState({newCardTitle: ''});
    }).catch(function(error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="List">
        <div className="List-content">
          <div className="List-header">
            <div className="List-header-title">
              {this.props.name}
            </div>
          </div>

          <div className="List-cards">
            {
              this.props.cards.map((card, index) => {
                return <Card key={`card-${index}`} title={card} />
              })
            }

            {this.state.composing &&
              <div>
                <form onSubmit={this.handleSubmit}>
                  <textarea className="List-composer" value={this.state.newCardTitle} onChange={this.newCardTitleChange}></textarea>
                  <input className="List-composer-add" type="submit" value="Add"/>
                  <a className="List-composer-close" href="#" onClick={this.toggleComposer}></a>
                </form>
              </div>
            }
          </div>

          {!this.state.composing &&
            <a className="List-add-card" href="#" onClick={this.toggleComposer}>Add a card…</a>
          }
        </div>
      </div>
    );
  }
}

export default List;

List.defaultProps = {
  cards: ['text1', 'text2', 'text3'],
  name: 'List1'
};
