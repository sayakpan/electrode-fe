import React from 'react'
import CardItem from './card-item'
import styles from '@/assets/scss/game.module.scss'


const CardHolder = ({cardInHand}) => {
  return (
    <div className={styles.card_container}>
        {cardInHand?.map((card) => (
            <CardItem key={card.code} card={card}/>
        ))}
    </div>
  )
}

export default CardHolder