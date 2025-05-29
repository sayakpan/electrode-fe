import React from 'react'
import Image from 'next/image'
import styles from '@/assets/scss/game.module.scss'


const CardItem = ({card}) => {
  return (
    <div className={styles.card_item}>
        <Image 
            src={card.image_url} 
            alt={card.code} 
            width={60} 
            height={80} 
            style={{borderRadius: 5, cursor: 'pointer'}}
            />
    </div>
  )
}

export default CardItem