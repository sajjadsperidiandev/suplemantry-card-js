import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loader = () => {
    return (
        <div className='loader'>

            <Spinner animation="border" role="status" variant="primary" size="lg">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>

    )
}

export default Loader
