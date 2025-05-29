'use client'

import React, { useEffect, useState } from 'react'
import styles from "@/assets/scss/home.module.scss"
import { useRouter } from 'next/navigation'
import { useRecoilState } from 'recoil'
import { currentRoomState, roomStatusState } from '@/store/room'
import VirtualRoom from '../rooms/virtual-room'
import CreateJoinRoom from '../rooms/create-join-room'
import { userState, profileState } from "@/store/auth";
import axiosInstance from '@/plugins/axios'
import Cookies from 'js-cookie'

const HomePage = () => {
    const router = useRouter()
    const [ currentRoom, setCurrentRoom ] = useRecoilState(currentRoomState)
    const [ roomStatus, setRoomStatus ] = useRecoilState(roomStatusState)
    const [user, setUser] = useRecoilState(userState);
    const [profile, setProfile] = useRecoilState(profileState);


    useEffect(() => {
        const token = Cookies.get("Token")
        if (!token) {
            router.replace('/login');
            return; 
        }
        async function fetchData() {
            if (!currentRoom) {
                if(profile && profile.active_room_id){
                    const activeRoomResponse = await axiosInstance.get(`/api/rooms/active/${profile.active_room_id}/`)
                    setCurrentRoom(activeRoomResponse.data)
                    setRoomStatus("joined")
                } else {
                    setRoomStatus('no_room')
                }
            }
        }
        fetchData();
    }, [currentRoom, profile, router, setCurrentRoom, setRoomStatus])

    return (
        <div className={styles.home_container}>
            {roomStatus === 'no_room' ? 
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