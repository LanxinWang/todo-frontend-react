import React from 'react';
import './index.css';

function TodoList() {
    return (
        <div id="show-todo">
            <ul id="todo-list">
                <li>
                    <div className="todo-item">
                        <input className='toggle' type="checkbox" defaultChecked={true}/>
                        <label />
                        <p className='completed'>completed</p>
                        <button className="destroy">×</button>
                    </div>
                </li>
                <li>
                    <div className="todo-item">
                        <input className='toggle' type="checkbox"/>
                        <label className=''/>
                        <p className='active'>active</p>
                        <button className="destroy">×</button>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default TodoList;