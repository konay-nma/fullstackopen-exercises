import React from 'react'
const Notifications = ({ errorMessage, message }) => {
    if (errorMessage !== null) {
        return (
            <div className="error">{errorMessage}</div>
        )
    } else if (message !== null) {
        return (
            <div className="message">{message}</div>
        )
    }
    return null;
}

export default Notifications