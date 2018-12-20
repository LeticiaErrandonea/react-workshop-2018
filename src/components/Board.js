import React, { useState, useEffect } from 'react';
import ListTile from './ListTile';
import NewList from './NewList';

function Board(props) {
  const [name, setName] = useState("");
  const [lists, setLists] = useState([]);

  useEffect(() => {
    fetch(`/boards/${props.match.params.boardId}`).then(res => res.json()).then((board) => {
      setLists(board.lists);
      setName(board.name);
    });
  }, [props.match.params.boardId]);

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
            <NewList boardId={props.match.params.boardId} onListCreation={(list) => { setLists([...lists, list]) }}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Board;
