import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';

const PlayerItem = ({player}) => {
    return (
        <List sx={{ width: '100%' }}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={player.name || 'Anonymous'} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                    primary={player.name || 'Anonymous'}
                    sx={{ color: "white", }}
                    secondary={
                        <React.Fragment>
                            <Typography
                                sx={{ display: 'inline', fontWeight: "bold" }}
                                component="span"
                                variant="body2"
                                color="lightgreen"
                            >
                                Ready
                            </Typography>
                        </React.Fragment>
                    }
                />
                <Tooltip title="Kick Out">
                    <IconButton aria-label="delete" color="error">
                        <LogoutIcon />
                    </IconButton>
                </Tooltip>
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    )
}

export default PlayerItem