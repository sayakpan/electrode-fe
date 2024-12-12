'use client'

import React, { useEffect, useState, useCallback } from 'react'
import styles from "@/assets/scss/game.module.scss"
import { Avatar } from 'primereact/avatar';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from "@/store/auth";
import { gameDataState, instanceState, biddingDataState } from '@/store/gameplay';
import axiosInstance from '@/plugins/axios';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CardHolder from '@/components/gameplay/card-holder';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';



const GameBoard = () => {
    const [ user, setUser ] = useRecoilState(userState);
    const [ gameData, setGameData ] = useRecoilState(gameDataState);
    const [ biddingData, setBiddingData ] = useRecoilState(biddingDataState)
    const [ bidModalVisible, setBidModalVisible] = useState(false);
    const [ othersBidding, setOthersBidding] = useState(false);

    const instance = useRecoilValue(instanceState);

    const getGameData = async () => {
        const response = await axiosInstance.get(`/api/twenty-nine/get-game/${instance.instance_id}`)
        setGameData(response.data)
    }

    useEffect(() => {
        if (biddingData.current_bidder.email === user.email) {
            setBidModalVisible(true);
        } else {
            setOthersBidding(true);
        }
    }, [biddingData.current_bidder.email, user.email])


    return (
        <div className={styles.game_container}>
            {
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
                        {/* <Button label="Show" icon="pi pi-external-link" onClick={() => setBidModalVisible(true)} /> */}
                        <Dialog
                            visible={bidModalVisible} modal={false} onHide={() => {if (!bidModalVisible) return; setBidModalVisible(false); }}
                            style={{ width: '330px' }} 
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
                        <Dialog
                            visible={othersBidding} modal={false} onHide={() => {if (!othersBidding) return; setBidModalVisible(false); }}
                            style={{ width: '330px' }} 
                            content={({ hide }) => (
                                <div className={'d-flex flex-wrap p-3 ' + styles.bid_container}>
                                    Others Are Bidding Now
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