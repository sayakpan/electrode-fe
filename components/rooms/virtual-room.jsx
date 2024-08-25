'use client'

import React, { useEffect, useState, useCallback } from 'react'
import axiosInstance from '@/plugins/axios'
import { useRecoilState } from 'recoil'
import styles from "@/assets/scss/home.module.scss"
import { useRouter } from 'next/navigation'
import { useSnackbar } from '../../context/SnackbarContext';
import { currentRoomState, roomStatusState } from '@/store/room'
import { gameProfilesState, selectedGameState } from '@/store/games'
import { instanceState } from '@/store/gameplay'
import PlayerItem from './player-item'
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import Image from 'next/image'
import Button from '@mui/material/Button'  
import FlagIcon from '@mui/icons-material/Flag';        


const VirtualRoom = () => {
    const router = useRouter()
    const [ isMounted, setIsMounted ] = useState(false);
    const { openSnackbar } = useSnackbar();
    const [ currentRoom, setCurrentRoom ] = useRecoilState(currentRoomState)
    const [ roomStatus, setRoomStatus ] = useRecoilState(roomStatusState)
    const [ gameProfiles, setGameProfiles ] = useRecoilState(gameProfilesState)
    const [ selectedGame, setSelectedGame ] = useRecoilState(selectedGameState)
    const [ instance, setInstance ] = useRecoilState(instanceState)


    const getAllGames = useCallback(async () => {
        const response = await axiosInstance.get("api/twenty-nine/profile/")
        setGameProfiles(response.data)
    }, [setGameProfiles])

    useEffect(() => {
        setIsMounted(true)
        const token = localStorage.getItem("authToken")
        if (!token) {
            router.replace('login')
        } else {
            getAllGames()
        }
    }, [getAllGames, roomStatus, router])

    const handleRefresh = async () =>{
        const response = await axiosInstance.get(`/api/rooms/${currentRoom.unique_id}/?passkey=${currentRoom.passkey}`)
        setCurrentRoom(response.data)
        openSnackbar(`Room Refreshed`,'success', 3000);
    }

    const handleStartGame = async () => {
        const payload = {
            game_id: selectedGame,
        }
        const response = await axiosInstance.post(`/api/twenty-nine/start/${currentRoom.unique_id}/`, payload)
        setInstance(response.data)
        console.log(response.data)
        router.push('/game')
    }

    return (
        <div className="container d-flex justify-content-center align-items-center">
            {isMounted && 
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
                    <div className='row'>
                        <div className='mt-2 col-8'>
                            {currentRoom?.players?.map((player) => (
                                <PlayerItem key={player.id} player={player} />
                            ))}
                        </div>
                        <div className='col-4 d-flex justify-content-center align-items-center'>
                            {gameProfiles?.map((game) => (
                                <div key={game.id} className={selectedGame === game.id ? styles.selected_game : ''}>
                                    <Image 
                                        onClick={() => setSelectedGame(game.id)}
                                        src={game.cover} 
                                        alt={game.name} 
                                        width={100} 
                                        height={100} 
                                        style={{borderRadius: 10, cursor: 'pointer'}}
                                        />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>
                        <Button type="submit" variant="contained" size="small" color="success" startIcon={<FlagIcon />} disabled={!selectedGame}
                            sx={{
                                marginTop: "2rem",
                                fontSize: "1rem",
                                fontWeight: 'bold',
                                textTransform: 'none',
                            }}
                            onClick={() => {handleStartGame()}}
                            >Start Game
                        </Button>
                    </div>
                </div>
            }
        </div>
    )
}

export default VirtualRoom