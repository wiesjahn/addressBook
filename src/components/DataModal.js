import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { createContact, updateContact } from '../graphql/mutations';
import API, { graphqlOperation } from '@aws-amplify/api';



function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      maxWidth: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      padding: theme.spacing(2, 4, 3),
    },
    selectBox: {
      width: 195
    },
    button: {
      marginTop: 10,
      marginLeft: "27%"
    }
  }));

export default function DataModal(props) {
    const { action, handleClose } = props;
    let contact = props.contact;
 
    const [ firstName, setFirstName ] = React.useState(contact.firstName);
    const [ lastName, setLastName ] = React.useState(contact.lastName);
    const [ home, setHome ] = React.useState(contact.home);
    const [ mobile, setMobile ] = React.useState(contact.mobile);
    const [ work, setWork ] = React.useState(contact.work);
    const [ type, setType ] = React.useState(contact.type);
 

    //Would a Case Statement Make more sense?
    //This seems way more convaluted than it should be.
    const handleFirstNameChange = (event) => {
        setFirstName( event.target.value); 
        contact.firstName = event.target.value;
    }

    const handleLastNameChange = (event) => { 
        setLastName( event.target.value);
        contact.lastName = event.target.value;
    }

    const handleHomeChange = (event) => {
        setHome( event.target.value); 
        contact.home = event.target.value;
    }

    const handleMobileChange = (event) => { 
        setMobile( event.target.value);
        contact.mobile = event.target.value;
    }

    const handleWorkChange = (event) => {
        setWork( event.target.value);
        contact.work = event.target.value;
    }

    const handleTypeChange = (event) => { 
        setType( event.target.value);
        contact.type = event.target.value;
    }

    async function newContact() { 
        const nonIdContact = {
            firstName: contact.firstName,
            lastName: contact.lastName,
            home: contact.home ==="" ? null : contact.home,
            mobile: contact.mobile ==="" ? null : contact.mobile,
            work: contact.work ==="" ? null : contact.work,
            type: contact.type 
        }
        await API.graphql(graphqlOperation(createContact, { input: nonIdContact }));
        handleClose();
    }
    
    async function editContact() { 
        await API.graphql(graphqlOperation(updateContact, { input: contact }));
        handleClose();
    }


    const [modalStyle] = React.useState(getModalStyle)
    const classes = useStyles();
    return (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Create a Contact</h2>
          <TextField onChange={handleFirstNameChange} value={contact.firstName} id="firstName" label="First Name" /> 
          <TextField onChange={handleLastNameChange} value={contact.lastName} id="lastName" label="Last Name" /> 
          <TextField onChange={handleHomeChange} value={contact.home} id="home" label="Home Number" /> 
          <TextField onChange={handleMobileChange} value={contact.mobile} id="mobile" label="Mobile Number" /> 
          <TextField onChange={handleWorkChange} value={contact.work} id="work" label="Work Number" /> 
          <TextField
            id="contactType"
            name="type"
            select
            className={classes.selectBox}
            label="Contact Type"
            value={type}
            onChange={handleTypeChange}
          >
            <MenuItem key="personal" name="Personal" value="Personal">Personal</MenuItem>
            <MenuItem key="professional" name="Professional" value="Professional">Professional</MenuItem>
          </TextField>
          <Button className={classes.button} onClick={action === 'create' ? newContact: editContact } variant="contained">
              { action === 'create' ? 'Create Contact' : 'Edit Contact' }
          </Button>
        </div>
    );
  }