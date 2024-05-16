import { useEffect, useState } from "react";
import { Cafe } from "./cafe";
import api from "../API/api";
import { Grid } from "@mui/material";
import CafeCard from "./CafeCard";
import NewCafe from "./NewCafe";
import Header from "../Header/Header";

export default function CafeList()
{
    
        const [cafes, setCafes] = useState<Cafe[] | []>([]);
        useEffect(()=>{
            api.Cafe.getCafes().then((data)=>setCafes(data))
            .catch((error)=>console.log(error));
        },[cafes])

        return (
            <Grid container spacing ={2} sx = {{ display: 'flex', justifyContent: 'center', alignItems: 'center'  }}>
                <Header/>
            <Grid item xs={12} sx = {{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <NewCafe cafes = {cafes} setCafes = {setCafes}/>
                </Grid>
                    {cafes.map(c => 
                        
            
                <Grid item xs={3} key={c.name} sx = {{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                    <CafeCard cafe = {c}/>
                </Grid>)}
            </Grid>
        );
    }
