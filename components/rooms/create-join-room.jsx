'use client'

import React, {useState, useEffect} from 'react'
import styles from "@/assets/scss/home.module.scss"
import axiosInstance from '@/plugins/axios'
import { useRecoilState } from 'recoil'
import { useRouter } from 'next/navigation'
import { useSnackbar } from '../../context/SnackbarContext';
import { currentRoomState, roomStatusState } from '@/store/room'
import { InputText } from 'primereact/inputtext'        
import { InputOtp } from 'primereact/inputotp'        
import { Button } from '@mui/material'  
import AddHomeIcon from '@mui/icons-material/AddHome';


const CreateJoinRoom = () => {
    const router = useRouter()
    const {openSnackbar} = useSnackbar();
    const [ isMounted, setIsMounted ] = useState(false);
    const [ activeTab, setActiveTab ] = useState("create");
    const [ currentRoom, setCurrentRoom ] = useRecoilState(currentRoomState)
    const [ roomStatus, setRoomStatus ] = useRecoilState(roomStatusState)
    const [ roomName, setRoomName ] = useState("")
    const [ roomUniqueId, setRoomUniqueId ] = useState("")
    const [ passkey, setPassKey ] = useState("")


    const handleCreateRoom = async () => {
        const payload = {
            name: roomName
        }
        try {
            const response = await axiosInstance.post("/api/rooms/create/", payload);
            setCurrentRoom(response.data); 
            setRoomStatus("created")
            openSnackbar(`Room Created`,'success', 3000);
        } catch (error) {
            openSnackbar(`Error creating room: ${error.response ? error.response.data : error.message}`,'error', 3000);
        }
    }

    const handleJoinRoom = async () => {
        const payload = {
            unique_id: roomUniqueId,
            passkey: passkey
        }
        try {
            const response = await axiosInstance.post("/api/rooms/join/", payload);
            setCurrentRoom(response.data); 
            setRoomStatus("joined")
            openSnackbar(`Joined Room ${response.data.name}`,'success', 3000);
        } catch (error) {
            openSnackbar(`Error joining room: ${error.response ? error.response.data : error.message}`,'error', 3000);
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center">
            <div className={"card shadow-sm p-4 " + styles.home_card} style={{ width: "100%", maxWidth: "800px" }}>
                <div className={styles.tabs + " d-flex justify-content-center mb-4"}>
                    <button className={`${activeTab === "create" ? styles.tab_active : styles.tab_inactive} me-2`} onClick={() => setActiveTab("create")}>
                        Create Room
                    </button>
                    <button className={`${activeTab === "join" ? styles.tab_active : styles.tab_inactive}`} onClick={() => setActiveTab("join")}>
                        Join Room
                    </button>
                </div>

                <div className='d-flex justify-content-center'>
                    {activeTab === "create" ?
                        (
                            <div className='d-flex justify-content-center align-items-center flex-column' style={{ width: "100%", height: "300px" }}>
                                <div className='text-center' style={{ height: "150px" }}>
                                    <div className="p-inputgroup flex-1" style={{ width: "100%" }}>
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-home"></i>
                                        </span>
                                        <InputText value={roomName} onChange={(e) => { setRoomName(e.target.value) }} placeholder="Enter Room Name" />
                                    </div>
                                    <div>
                                        <Button type="submit" variant="contained" size="small" color="success" startIcon={<AddHomeIcon />}
                                            sx={{
                                                marginTop: "2rem",
                                                fontSize: "1rem",
                                                fontWeight: 'bold',
                                                textTransform: 'none',
                                            }}
                                            onClick={() => handleCreateRoom()}
                                        >Create
                                        </Button>
                                    </div>
                                </div>
                                <div className='text-info'>
                                    <small>A virtual room will be created where you can play games with your friends.</small>
                                </div>
                            </div>
                        ) :
                        (
                            <div className='d-flex justify-content-center align-items-center' style={{ width: "100%", height: "300px" }}>
                                <div className='text-center'>
                                    <div className="p-inputgroup flex-1" style={{ width: "100%" }}>
                                        <span className="p-inputgroup-addon">
                                            <i className="pi pi-home"></i>
                                        </span>
                                        <InputText value={roomUniqueId} onChange={(e) => setRoomUniqueId(e.target.value)} placeholder="Enter Room ID" />
                                    </div>
                                    <div className='d-flex flex-column align-items-center mt-3'>
                                        <p className="text-white block">Enter the room passkey</p>
                                        <InputOtp length={6} value={passkey} onChange={(e) => setPassKey(e.value)} integerOnly />
                                    </div>
                                    <div>
                                        <Button type="submit" variant="contained" size="small" color="success" startIcon={<AddHomeIcon />}
                                            sx={{
                                                marginTop: "2rem",
                                                fontSize: "1rem",
                                                fontWeight: 'bold',
                                                textTransform: 'none',
                                            }}
                                            onClick={() => handleJoinRoom()}
                                        >Join
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                </div>
            </div>
        </div>
    )
}

export default CreateJoinRoom