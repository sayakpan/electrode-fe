import React, { useEffect, useState } from 'react'
import axiosInstance from '@/plugins/axios'
import { useRecoilState } from 'recoil'
import styles from "@/assets/scss/home.module.scss"
import { useRouter } from 'next/navigation'
import { useSnackbar } from '../../context/SnackbarContext';
import { currentRoomState, roomStatusState } from '@/store/room'
import PlayerItem from './player-item'
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';


const VirtualRoom = () => {
    const router = useRouter()
    const { openSnackbar } = useSnackbar();
    const [ currentRoom, setCurrentRoom ] = useRecoilState(currentRoomState)
    const [ roomStatus, setRoomStatus ] = useRecoilState(roomStatusState)


    useEffect(() => {
        const token = localStorage.getItem("authToken")
        if (!token){
            router.replace('login')
        }
    },)

    const handleRefresh = async () =>{
        const response = await axiosInstance.get(`/api/rooms/${currentRoom.unique_id}/?passkey=${currentRoom.passkey}`)
        setCurrentRoom(response.data)
        openSnackbar(`Room Refreshed`,'success', 3000);
    }

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className={"card shadow-sm p-4 " + styles.home_card} style={{ width: "100%", maxWidth: "800px" }}>
                <div className={styles.tabs + " d-flex justify-content-between align-items-center mb-4 text-white fw-bold"} style={{height: "50px" }}>
                    <div className='mx-3 '>{currentRoom?.name}</div>
                    <div>
                        <span className='mx-3 '>Room ID: {currentRoom?.unique_id}</span>
                        <span className='mx-3 '>Passkey: {currentRoom?.passkey}</span>
                    </div>
                </div>
                <div className='d-flex justify-content-between'>
                    <div className='text-warning'>
                        <small>Share the Room ID and Passkey to your friend and ask to join.</small>
                    </div>
                    <div className='text-white'>
                        <Tooltip title="Refresh">
                            <IconButton onClick={handleRefresh}>
                                <AutorenewIcon />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <div className='mt-2'>
                    {currentRoom?.players?.map((player) => (
                        <PlayerItem key={player.id} player={player} />
                    ))}
                </div>
                
            </div>
        </div>
    )
}

export default VirtualRoom