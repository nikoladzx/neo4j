import { useEffect, useState } from "react";
import api from "../API/api";
import { Grid } from "@mui/material";
import { Member } from "./member";
import MemberCard from "./MemberCard";
import NewMember from "./NewMember";

export default function MemberList()
{
    
        const [members, setMembers] = useState<Member[] | []>([]);
        useEffect(()=>{
            api.Member.getMembers().then((data)=>setMembers(data))
            .catch((error)=>console.log(error));
        },[members])
        return (
            <Grid container spacing ={4}>
            <Grid item xs={12} sx = {{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3 }}>
                <NewMember/>
                </Grid>
                    {members.map(m => 
                        
            
                <Grid item xs={3} key={m.username} >
                    <MemberCard member = {m}/>
                </Grid>)}
            </Grid>
        );
    }
