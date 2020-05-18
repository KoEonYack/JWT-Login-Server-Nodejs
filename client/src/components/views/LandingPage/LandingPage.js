import React, {useEffect} from 'react'
import axios from 'axios'


function LandingPage() {

    useEffect(() => {
        axios.get('http://localhost:5002/api/hello')
        .then(response => console.log(response.data))
    }, [])


    return (
        <div>
            LandingPages
        </div>
    )
}

export default LandingPage
