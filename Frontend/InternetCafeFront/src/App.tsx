
import { Grid } from '@mui/material'
import './App.css'
import CafeList from './Cafe/CafeList'


function App() {

  return (
   
      <Grid container spacing ={3} >
      
  <Grid item xs={12}>
   
  </Grid>

  <Grid item xs={12}>
    <CafeList/>
    </Grid>


  </Grid>
    
  )
}

export default App
