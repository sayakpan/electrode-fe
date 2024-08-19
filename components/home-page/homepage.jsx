'use client'

import React, { useEffect, useState } from 'react'

const HomePage = () => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        
    }, [])

    return (
        <div>HomePage

            <p>{user}</p>
        </div>
    )
}

export default HomePage