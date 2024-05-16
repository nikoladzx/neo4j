import { Box, Button, Grid, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import api from "../API/api";
import { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { Employee } from "./employee";

interface Props {
    employees: Employee[];
    setEmployees:React.Dispatch<React.SetStateAction<[] | Employee[]>>;
}

export default function NewEmployee({employees, setEmployees} : Props)
{   const {cafename} = useParams();
    
    const [salary, setSalary] = useState(0);
    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [email, setEmail] = useState("");
    function addEmployee(): void {
        api.Cafe.addEmployee(cafename!, name, salary, age, email)
        .then(r=>
            {
                const newEmployee ={name : r.name,salary : r.salary,age : r.age,email : r.age,cafename : r.cafename};
                setEmployees([...employees, newEmployee]);
            }
        )
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