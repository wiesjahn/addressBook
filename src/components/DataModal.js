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
    const { action } = props;
    let contact = props.contact;   
    //const [contact, setContact ] = React.useState(props.contact);
    
    const handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const id = target.id;
      };

    const handleTypeChange = (event) => { 
        setType( event.target.value);
        setContact({
        id: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        home: contact.home,
        mobile:contact.mobile,
        work: contact.work,
        type: event.target.value
        });
    }

    function newContact() { 
        console.log(type);
        console.log(contact)
        // const newContact = await API.graphql(graphqlOperation(createContact, { input: this.contact }));
    }
    
    async function editContact() { 
        const editContact = await API.graphql(graphqlOperation(updateContact, { input: this.contact }));
    }


    const [modalStyle] = React.useState(getModalStyle)
    const classes = useStyles();
    const [ type, setType ] = React.useState(contact.type);
    return (
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Create a Contact</h2>
          <TextField onChange={handleChange} value={contact.firstName} id="firstName" label="First Name" /> 
          <TextField onChange={handleChange} value={contact.lastName} id="lastName" label="Last Name" /> 
          <TextField onChange={handleChange} value={contact.home} id="home" label="Home Number" /> 
          <TextField onChange={handleChange} value={contact.mobile} id="mobile" label="Mobile Number" /> 
          <TextField onChange={handleChange} value={contact.work} id="work" label="Work Number" /> 
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