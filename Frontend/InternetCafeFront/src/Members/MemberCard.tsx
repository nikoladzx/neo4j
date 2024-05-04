import { Card, CardContent, Typography, Button, TextField } from "@mui/material";
import { Member } from "./member";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { ChangeEvent, useState } from "react";
import api from "../API/api";


interface Props {
    member: Member;
 
}



export default function MemberCard({member} : Props)
{
  const [memberCredits, setMemberCredits] = useState<number>(member.credits);
  const [credits, setCredits] = useState<number>(0);
  const [change, setChange] = useState<boolean>(false);
  console.log("credits" + memberCredits + "creditsmember" + member.credits + " ss" + member.username);
  function handleClick(): void {
    api.Member.addCredits(member.username, credits)
    .then(r => setMemberCredits(r[0].credits))
    .catch((error)=>console.log(error))
    setChange(!change);
  }

  function changeCredits(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
    setCredits(parseInt(event.target.value));
  }

  function handleDelete(): void {
    api.Member.deleteMember(member.username)
    .catch(e=>console.log(e))
  }

    return(
        <>
        <Card sx={{ minWidth: 275 }}>
        <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5" component="div">
          {"Username : " + member.username}
        </Typography>
      </CardContent>
      <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5" component="div">
          {"Password : " + member.password}
        </Typography>
      </CardContent>
      <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        <Typography color="text.secondary">
        {"Credits : " + memberCredits}
        </Typography>
      </CardContent>

      <CardContent sx={{ display: "flex", justifyContent: "center" }}>
          <TextField
          id="number-input"
          label="Enter a number"
          type="number"
          variant="outlined"
          value = {credits}
          onChange={changeCredits}
          />
        <Button onClick={handleClick} sx = {{}}>
        <AddIcon ></AddIcon>
        </Button>
        <Button onClick={handleDelete} sx = {{}}>
        <DeleteIcon ></DeleteIcon>
        </Button>
        
      </CardContent>
      
    </Card>
        </>
    )
}