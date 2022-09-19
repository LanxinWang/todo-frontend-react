import React from 'react';
import './index.css';

function TodoCount() {
    return (
        <div id="count-todo">
            <span id="active-count">
                <strong></strong>
                <span> items</span>
                <span> left</span>
            </span>
            <ul id="filters">
                <li><button id="all" className='selected'>All</button></li>
                <li><button id="active">Active</button></li>
                <li><button id="completed">Completed</button></li>
            </ul>
            <button id="clear-completed">Clear completed</button>
        </div>
    )
}

export default TodoCount;