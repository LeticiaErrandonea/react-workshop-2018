import React from 'react';
import ListTile from './ListTile';
import NewList from './NewList';

function Board(props) {
  const name = "Meetup JS";
  const lists = [{ id: 1, name: "Modular CSS", cards: [] }, { id: 2, name: "Login nativescript-vue con Firebase", cards: [] }, { id: 3, name: "React Hooks", cards: [] }]

  return(
    <div className="Board">
      <div className="Board-content">
        <div className="Board-header">
          <span className="Board-header-btn">
            {name}
          </span>
        </div>
        <div className="Board-canvas">
          <div className="Board-canvas-content">
            {
              lists.map((list) => {
                return <ListTile key={list.id} id={list.id} name={list.name} boardId={props.match.params.boardId} cards={list.cards}/>
              })
            }
            <NewList boardId={props.match.params.boardId} onListCreation={(list) => { console.log(list); }}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Board;
