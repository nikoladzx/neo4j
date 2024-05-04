import { Box, Button, Grid, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import api from "../API/api";
import { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";


export default function NewEmployee()
{   const {cafename} = useParams();
    
    const [salary, setSalary] = useState(0);
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState("");
    function addEmployee(): void {
        api.Cafe.addEmployee(cafename!, name, salary, age, email)
        .catch(e => console.log(e))
    }

    function changeEmail(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setEmail(event.target.value);
    }

    function changeName(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setName(event.target.value);
    }
    function changeSalary(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setSalary(parseInt(event.target.value));
    }
    function changeAge(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        setAge(parseInt(event.target.value));
    }

    return(
        <>
        <Box>
        <Grid container spacing ={3}>
            <Grid item xs={2}>
            <TextField id="standard-basic" 
            label="Name" 
            variant="standard"
            value = {name}
            onChange={changeName}
            />
            </Grid>
            <Grid item xs={2}>
            <TextField 
            id="standard-basic" 
            label="Salary" 
            variant="standard" 
            value = {salary}
            onChange={changeSalary}/>
            </Grid>
            <Grid item xs={2}>
            <TextField id="standard-basic" 
            label="Age" 
            variant="standard"
            value = {age}
            onChange={changeAge}
            />
            </Grid>
            <Grid item xs={2}>
            <TextField 
            id="standard-basic" 
            label="Email" 
            variant="standard" 
            value = {email}
            onChange={changeEmail}/>
            </Grid>
            <Grid item xs={2}>
                <Button onClick={addEmployee}>
                    <AddIcon></AddIcon>
                </Button>
            
            </Grid>
        </Grid>
        </Box>
        </>
    )
}