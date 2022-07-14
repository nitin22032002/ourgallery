import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();

  const handleClick=()=>{
    
      window.location.href="/new"
  }
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography onClick={()=>{window.location.href="/"}} style={{cursor:"pointer"}} variant="h6" className={classes.title} >
            Our Gallery
          </Typography>
          <Button onClick={()=>{handleClick()}} color="inherit"><AddIcon/></Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
