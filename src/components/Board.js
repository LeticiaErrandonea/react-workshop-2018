import React, { useState, useEffect } from 'react';
import ListTile from './ListTile';
import NewList from './NewList';

function Board(props) {
  const name = useValueState("");
  const lists = useValueState([]);

  useEffect(() => {
    fetch(`/boards/${props.match.params.boardId}`).then(res => res.json()).then((board) => {
      lists.handleChange(board.lists);
      name.handleChange(board.name);
    });
  }, [props.match.params.boardId]);

  return(
    <div className="Board">
      <div className="Board-content">
        <div className="Board-header">
          <span className="Board-header-btn">
            {name.value}
          </span>
        </div>
        <div className="Board-canvas">
          <div className="Board-canvas-content">
            {
              lists.value.map((list) => {
                return <ListTile key={list.id} id={list.id} name={list.name} boardId={props.match.params.boardId} cards={list.cards}/>
              })
            }
            <NewList boardId={props.match.params.boardId} onListCreation={(list) => { lists.handleChange([...lists.value, list]) }}/>
          </div>
        </div>
      </div>
    </div>
  )
}

function useValueState(initialValue) {
  const [value, setValue] = useState(initialValue);

  function handleChange(newValue) {
    setValue(newValue);
  }

  return {
    value,
    handleChange,
  }
}

export default Board;
