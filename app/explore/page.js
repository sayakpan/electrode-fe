'use client'

import axiosInstance from '@/plugins/axios'
import React, { useEffect, useState } from 'react'

const ExplorePage = () => {
    const [all_cards, setAllCards] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axiosInstance.get('/api/cardgames/get-all-cards/')
                setAllCards(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, []);

    return (
        <div>
            {all_cards.map((card) => (
                <p key={card.id}>{card.name} {card.suit}
                    <img src={card.image_url} alt='' width={100} height={100} />
                    <img src={card.svg_url} alt='' width={100} height={100} />
                </p>
            ))}
        </div>
    )
}

export default ExplorePage