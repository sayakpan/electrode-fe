'use client'

import React, { useEffect, useState } from 'react'
import styles from "@/assets/scss/home.module.scss"
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { currentRoomState, roomStatusState } from '@/store/room'
import VirtualRoom from '../rooms/virtual-room'
import CreateJoinRoom from '../rooms/create-join-room'

const HomePage = () => {
    const router = useRouter()
    const [ isMounted, setIsMounted ] = useState(false);
    const [ currentRoom, setCurrentRoom ] = useRecoilState(currentRoomState)
    const [ roomStatus, setRoomStatus ] = useRecoilState(roomStatusState)


    useEffect(() => {
        setIsMounted(true)
        const token = localStorage.getItem("authToken")
        if (!token){
            router.replace('login')
        }

        if (!currentRoom) {
            setRoomStatus('no_room')
        }
    }, [currentRoom, router, setRoomStatus],)

    return (
        <div className={styles.home_container}>
            {isMounted && roomStatus === 'no_room' ? 
                (
                    <CreateJoinRoom />
                ):( 
                    <VirtualRoom />
                )
            }
        </div>
    )
}

export default HomePage