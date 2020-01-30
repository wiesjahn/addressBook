import React, { useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ContactCard from './ContactCard';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import { listContacts } from './../graphql/queries'
import API, { graphqlOperation } from '@aws-amplify/api';
import Amplify from 'aws-amplify';
// import * as subscriptions from '../graphql/subscritions';


// //Subscribe to a New Contact being added
// const subscription = API.graphql(
//   graphqlOperation(subscriptions.onCreateTodo)
// ).subscribe({
//   next: (todoData) => console.log(todoData)
// });

// //Stop subscription
// subscription.unsubscribe();

// Action Types
const QUERY = 'QUERY';

const initialState = {
  contacts: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case QUERY:
      return {...state, contacts: action.contacts};
    default:
      return state;
  }
};

// async function createContact() { 
//   const contact = {}
//   await API.graphql(graphqlOperation(createContact, { input: contact }));
//}

const useStyles = makeStyles(theme => ({
    paper: {
        margin: 20,
        padding: 16,
        minWidth: 250,
        maxWidth: 1100
    }
  }));
  
  export default function Body(props) {
    const classes = useStyles();
    const [state, dispatch] = useReducer(reducer, initialState)
    const { setContact } = props;
    useEffect(() => {
      async function getData() {
        const contactData = await API.graphql(graphqlOperation(listContacts));
        dispatch({ type: QUERY, contacts: contactData.data.listContacts.items });
      }
      getData();
    }, []);
    return (      
        <Paper className={classes.paper} variant="outlined">
            <Grid container spacing={3} alignItems="center" justify="space-evenly" >
                {state.contacts.map(contact => (
                <Grid item xs={12} sm={5} md={5}>
                    <ContactCard contact={contact} setContact={setContact} className={classes.card} />
                </Grid>
                ))}
            </Grid>
        </Paper>               
    );}
