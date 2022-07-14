import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { getRequest } from '../API/server';
import ContextMain from '../Context/MainContext';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
export default function ImageCard(props) {
  let image=props.img;
  const classes = useStyles();
  const context=useContext(ContextMain)
  const handleClick=()=>{
    window.location.href=`/show/${image._id}`
  }
  const handleLikeImage=async()=>{
        context.setOpen(true)
        let res=await getRequest(`/like/${image._id}`,"get")
        if(res.status){
          context.api_getImages(null,context.getCurrentPage)
        }
        else{
          alert("Server Error....")
        }
          context.setOpen(false)
  }
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {String(image.image_name).toUpperCase().substring(0,1)}
          </Avatar>
        }

        title={image.image_name}
        subheader={new Date(image.add_date).toISOString()}
        onClick={()=>{handleClick()}}
      />
      <CardMedia
        className={classes.media}
        image={image.image_url}
        title={image.image_name}
        onClick={()=>{handleClick()}}
      />
      <CardContent onClick={()=>{handleClick()}}> 
        <Typography variant="body2" color="textSecondary" component="p">
         {image.image_details}
        </Typography>
      </CardContent> 
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={()=>{handleLikeImage()}}>
          <FavoriteIcon style={{color:image.image_like?red[500]:"black"}} />
        </IconButton>
        </CardActions>
    </Card>
  );
}
