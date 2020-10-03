import React from 'react';

const PersonForm = (props) =>
    <form onSubmit={props.handleSubmit}>
        <div>
            name: <input value={props.newName} onChange={props.handleNameChange} /> <br />
            number: <input value={props.newNumber} onChange={props.handlePhoneChange} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>

export default PersonForm