import { useEffect, useState } from "react";
import api from "../API/api";
import { Grid } from "@mui/material";
import { Employee } from "./employee";
import EmployeeCard from "./EmployeeCard";
import NewEmployee from "./NewEmployee";
import { useParams } from "react-router-dom";
import Header from "../Header/Header";


export default function EmployeeList()
{
    const {cafename} = useParams();
        const [employees, setEmployees] = useState<Employee[] | []>([]);
        useEffect(()=>{
            api.Cafe.getEmployeesByCafe(cafename!).then((data)=>setEmployees(data))
            .catch((error)=>console.log(error));
        },[employees])
        return (
            <Grid container spacing ={2} sx = {{ display: 'flex', justifyContent: 'center', alignItems: 'center'  }} >
                <Header/>
            <Grid item xs={12} sx = {{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3  }}>
                <NewEmployee employees ={employees} setEmployees={setEmployees}/>
                </Grid>
                    {employees.map(m => 
                        
            
                <Grid item xs={12} key={m.email} sx = {{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3  }} >
                    <EmployeeCard employee = {m}/>
                </Grid>)}
            </Grid>
        );
    }
