import { Card, CardContent, Typography, Button, TextField, Grid, Divider } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ChangeEvent, useState } from "react";
import api from "../API/api";
import { Employee } from "./employee";


interface Props {
    employee: Employee;
 
}



export default function EmployeeCard({employee} : Props)
{
  const [employeeSalary, setEmployeeSalary] = useState<number>(employee.salary);
  const [salary, setSalary]= useState<number>(employee.salary);
  function handleClick(): void {
    api.Employee.editEmployeeSalary(employee.email, salary)
    .then(r => setEmployeeSalary(r[0].salary))
    .catch((error)=>console.log(error))
  }

  function changeSalary(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    setSalary(parseInt(event.target.value));
  }

    function handleDelete(): void {
        api.Employee.deleteEmployee(employee.email)
        .catch(e=>console.log(e))
    }

    return(
        <>
        <Card sx={{ }}>
            <Grid container>
                <Grid container xs={9}>
        <Grid container xs={12}>


            <Grid item xs={3}>
            <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5" component="div">
          {"EMAIL"}
        </Typography>
      </CardContent>
      
            </Grid>
            <Grid item xs={3}>
            <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5" component="div">
          {"NAME"}
        </Typography>
      </CardContent>
            </Grid>
            <Grid item xs={3}>
            <CardContent sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h5" component="div">
        {"SALARY"}
        </Typography>
      </CardContent>
            </Grid>
            <Grid item xs={3}>
            <CardContent sx={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="h5" component="div">
        {"AGE"}
        </Typography>
      </CardContent>
            </Grid>
            
            </Grid>
            <Divider sx ={{color : "blue"}}/>
            <Grid container xs = {12}>
                
            <Grid item xs={3}>
            <CardContent sx={{ display: "flex", justifyContent: "center" }}>
            <Typography color="text.secondary">
          {employee.email}
        </Typography>
      </CardContent>
            </Grid>
            <Grid item xs={3}>
            <CardContent sx={{ display: "flex", justifyContent: "center" }}>
            <Typography color="text.secondary">
          {employee.name}
        </Typography>
      </CardContent>
            </Grid>
            <Grid item xs={3}>
            <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        <Typography color="text.secondary">
        {employeeSalary + " RSD"}
        </Typography>
      </CardContent>
            </Grid>
            <Grid item xs={3}>
            <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        <Typography color="text.secondary">
        {employee.age + " years old"}
        </Typography>
      </CardContent>
            </Grid>
          
           
</Grid>

</Grid>
<Grid container xs={3}>
<Grid item xs={12}>
            <CardContent sx={{ display: "flex", justifyContent: "center", pt:5}}>
          <TextField
          id="number-input"
          label="Change salary"
          type="number"
          variant="outlined"
          value = {salary}
          onChange={changeSalary}
          />
        <Button onClick={handleClick} sx = {{}}>
        <EditIcon ></EditIcon>
        </Button>
        <Button onClick={handleDelete} sx = {{}}>
        <DeleteIcon ></DeleteIcon>
        </Button>
        
      </CardContent>
      </Grid>
</Grid>
     </Grid>
      

     
      
    </Card>
        </>
    )
}