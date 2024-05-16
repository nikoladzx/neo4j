import { Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import { Cafe } from "./cafe";
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import api from "../API/api";

interface Props {
    cafe: Cafe;
 
}



export default function CafeCard({cafe} : Props)
{
  function handleDelete(): void {
    api.Cafe.deleteCafe(cafe.name)
    .catch(e=>console.log(e))
  }

    return(
        <>
        <Card sx={{ minWidth: 275 }}>
        <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5" component="div">
          {"Name : "}
        </Typography>
        <Typography variant="h5" component="div">
          {cafe.name}
        </Typography>
      </CardContent>
      <CardContent sx={{ display: "flex", justifyContent: "center" }}>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
        {"Address :"+cafe.address}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "center" }}>
        
      <Link to={`/Employees/${cafe.name}`}>
      <Button size="small">Employees</Button>
      </Link>
      <Button size="small" onClick={handleDelete}>
        <DeleteIcon></DeleteIcon>
      </Button>
      </CardActions>
      
    </Card>
        </>
    )
}