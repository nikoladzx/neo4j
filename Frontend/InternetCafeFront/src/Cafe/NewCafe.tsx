import { Box, Button, Grid, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import api from "../API/api";
import { ChangeEvent, useState } from "react";
import { Cafe } from "./cafe";

interface Props {
    cafes: Cafe[];
    setCafes : React.Dispatch<React.SetStateAction<[] | Cafe[]>>;
 
}
export default function NewCafe({cafes, setCafes} : Props)
{
    const [address, setAddress] = useState("");
    const [name, setName] = useState("");
    function addCafe(): void {
        api.Cafe.addCafe(name, address)
        .then(r => {
            const newCafe = { name: r.name, address: r.address };
            setCafes([...cafes, newCafe])})
        .catch(e => console.log(e))
    }

    function changeAddress(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setAddress(event.target.value);
    }

    function changeName(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setName(event.target.value);
    }

    return(
        <>
        <Box>
        <Grid container spacing ={3}>
            <Grid item xs={5}>
            <TextField id="standard-basic" 
            label="Name" 
            variant="standard"
            value = {name}
            onChange={changeName}
            />
            </Grid>
            <Grid item xs={5}>
            <TextField 
            id="standard-basic" 
            label="Address" 
            variant="standard" 
            value = {address}
            onChange={changeAddress}/>
            </Grid>
            <Grid item xs={2}>
                <Button onClick={addCafe}>
                    <AddIcon></AddIcon>
                </Button>
            
            </Grid>
        </Grid>
        </Box>
        </>
    )
}