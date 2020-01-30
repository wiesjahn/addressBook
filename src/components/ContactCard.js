import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import DataModal from './DataModal';
import { deleteContact } from '../graphql/mutations';
import API, { graphqlOperation } from '@aws-amplify/api';


const useStyles = makeStyles({
    card: {
      minWidth: 250,
      maxWidth: 375,
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    cardActions: {
      marginLeft: '35%'
     }
  });


  function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  export default function ContactCard(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const { contact, setContact } = props;
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    async function handleDelete() {
        await API.graphql(graphqlOperation(deleteContact, { input: {id: contact.id} }));
        setOpen(false);
    }

    return (
    <div>
      <Card className={classes.card} variant="outlined" id={contact.id} key={contact.id}> 
        <CardContent>
          <Typography variant="h5" component="h2">
            {contact.firstName} {contact.lastName}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {contact.type}
          </Typography>
          {contact.mobile && 
          <Typography variant="body2" component="p">
          Mobile: {contact.mobile}
          </Typography>
          } 
          {contact.home && 
          <Typography variant="body2" component="p">
          Home: {contact.home}
          </Typography>
          }
          {contact.work && 
          <Typography variant="body2" component="p">
          Work: {contact.work} 
          </Typography>
          }
        </CardContent>
        <div>
          <CardActions>
          <IconButton className={classes.cardActions} aria-label="edit contact" onClick={ handleOpen }>
            <EditIcon />
          </IconButton>
          <IconButton className={classes.cardActions} onClick={handleDelete} aria-label="remove contact">
            <HighlightOffIcon />
          </IconButton>
          </CardActions>
        </div>
      </Card>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
      >
        <DataModal contact={contact} handleClose={handleClose} action="edit" />
      </Modal>
    </div>
    );
  }
