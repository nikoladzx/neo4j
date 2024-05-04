import { Box, Button, Grid, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import api from "../API/api";
import { ChangeEvent, useState } from "react";


export default function NewMember()
{
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    function addMember(): void {
        api.Member.addMember(username, password)
        .catch(e => console.log(e))
    }

    function changePassword(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setPassword(event.target.value);
    }

    function changeUsername(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setUsername(event.target.value);
    }

    return(
        <>
        <Box>
        <Grid container spacing ={3}>
            <Grid item xs={5}>
            <TextField id="standard-basic" 
            label="Username" 
            variant="standard"
            value = {username}
            onChange={changeUsername}
            />
            </Grid>
            <Grid item xs={5}>
            <TextField 
            id="standard-basic" 
            label="Password" 
            variant="standard" 
            value = {password}
            onChange={changePassword}/>
            </Grid>
            <Grid item xs={2}>
                <Button onClick={addMember}>
                    <AddIcon></AddIcon>
                </Button>
            
            </Grid>
        </Grid>
        </Box>
        </>
    )
}