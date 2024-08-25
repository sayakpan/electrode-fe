'use client'

import React, { useEffect, useState, useCallback } from 'react'
import styles from "@/assets/scss/game.module.scss"
import { Avatar } from 'primereact/avatar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { gameDataState, instanceState } from '@/store/gameplay';
import axiosInstance from '@/plugins/axios';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';


const GameBoard = () => {
    const [ isMounted, setIsMounted ] = useState(false);
    const [ gameData, setGameData ] = useRecoilState(gameDataState);
    const instance = useRecoilValue(instanceState);


    useEffect(() => {
        setIsMounted(true)
        const token = localStorage.getItem("authToken")
        if (!token) {
            router.replace('login')
        }
    }, [])

    const getGameData = async () => {
        const response = await axiosInstance.get(`/api/twenty-nine/get-game/${instance.instance_id}`)
        setGameData(response.data)
    }

    return (
        <div className={styles.game_container}>
            {isMounted && 
                <div className="container d-flex justify-content-center align-items-center">
                    <div className={"card shadow-sm p-4 " + styles.game_card}>
                        <div>
                            <Tooltip title="Refresh">
                                <IconButton onClick={getGameData}>
                                    <AutorenewIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div className={styles.player_1}><Avatar icon="pi pi-user" size="xlarge" shape="circle" /></div>
                        <div className={styles.player_2}><Avatar icon="pi pi-user" size="xlarge" shape="circle" /></div>
                        <div className={styles.player_3}><Avatar icon="pi pi-user" size="xlarge" shape="circle" /></div>
                        <div className={styles.player_4}><Avatar icon="pi pi-user" size="xlarge" shape="circle" /></div>
                    </div>
                </div>   
            }
        </div>           
    )
}

export default GameBoard