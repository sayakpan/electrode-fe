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
import CardHolder from '@/components/gameplay/card-holder';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';



const GameBoard = () => {
    const [ isMounted, setIsMounted ] = useState(false);
    const [ gameData, setGameData ] = useRecoilState(gameDataState);
    const [ bidModalVisible, setBidModalVisible] = useState(false);

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
                        <div className={styles.player_1}>
                            <Avatar icon="pi pi-user" size="large" shape="circle" />
                            <p>{gameData.team_info.your_profile.name}</p>
                        </div>
                        <div className={styles.player_2}>
                            <Avatar icon="pi pi-user" size="large" shape="circle" />
                            <p>{gameData.team_info[gameData.team_info.opponent_team][0].name}</p>
                        </div>
                        <div className={styles.player_3}>
                            <Avatar icon="pi pi-user" size="large" shape="circle" />
                            <p>{gameData.team_info[gameData.team_info.your_team].find(player => player.id !== gameData.team_info.your_profile.id).name}</p>
                        </div>
                        <div className={styles.player_4}>
                            <Avatar icon="pi pi-user" size="large" shape="circle" />
                            <p>{gameData.team_info[gameData.team_info.opponent_team][1].name}</p>
                        </div>
                        
                        <CardHolder cardInHand={gameData.player_cards.cards_in_hand}/>
                        <Button label="Show" icon="pi pi-external-link" onClick={() => setBidModalVisible(true)} />
                        <Dialog
                            visible={bidModalVisible} modal={false} onHide={() => {if (!bidModalVisible) return; setBidModalVisible(false); }}
                            style={{ width: '23vw' }} 
                            breakpoints={{ '960px': '75vw', '641px': '100vw' }}
                            content={({ hide }) => (
                                <div className={'d-flex flex-wrap p-3 ' + styles.bid_container}>
                                    {Array.from({ length: 13 }, (_, i) => (
                                        <div key={i + 16} className={styles.bid_cells}>
                                            {i + 16}
                                        </div>
                                    ))}
                                    <div className={styles.pass_cell}>
                                        Pass
                                    </div>
                                </div>
                            )}
                            >
                        </Dialog>
                    </div>
                </div>   
            }
        </div>           
    )
}

export default GameBoard