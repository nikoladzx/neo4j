import { useEffect, useState } from "react";
import { Cafe } from "./cafe";
import api from "../API/api";
import { Grid } from "@mui/material";
import CafeCard from "./CafeCard";
import NewCafe from "./NewCafe";

export default function CafeList()
{
    
        const [cafes, setCafes] = useState<Cafe[] | []>([]);
        useEffect(()=>{
            api.Cafe.getCafes().then((data)=>setCafes(data))
            .catch((error)=>console.log(error));
        },[cafes])
        console.log(cafes);
        return (
            <Grid container spacing ={4}>
            <Grid item xs={12} sx = {{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <NewCafe/>
                </Grid>
                    {cafes.map(c => 
                        
            
                <Grid item xs={3} key={c.name} sx = {{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <CafeCard cafe = {c}/>
                </Grid>)}
            </Grid>
        );
    }
