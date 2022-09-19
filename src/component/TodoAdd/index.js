import React from 'react';
import './index.css';

function TodoAdd() {
    return (
        <div id='add-todo'>
             <input id="toggle-all" type="checkbox" />
             <label htmlFor="toggle-all">❯</label>
            <input id="new-todo" placeholder="What needs to be done?"></input>
        </div>
    )
}

export default TodoAdd;


