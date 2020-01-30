import React, { useEffect, useReducer } from 'react';
import awsconfig from '../aws-exports';
import { makeStyles } from '@material-ui/core/styles';
import ContactCard from './ContactCard';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
import { listContacts } from './../graphql/queries'
import API, { graphqlOperation } from '@aws-amplify/api';
import Amplify from 'aws-amplify';
import * as subscriptions from '../graphql/subscriptions';

API.configure(awsconfig);

const initialState = {
  contacts: [],
};

//Subscribe to a New Contact being added


// Action Types
const QUERY = 'QUERY';



const reducer = (state, action) => {
  switch (action.type) {
    case QUERY:
      return {...state, contacts: action.contacts};
    default:
      return state;
  }
};



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

    const subscription1 = API.graphql(
      graphqlOperation(subscriptions.onCreateContact)
    ).subscribe({
      next:
 
          async function getData() {
            const contactData = await API.graphql(graphqlOperation(listContacts));
            dispatch({ type: QUERY, contacts: contactData.data.listContacts.items });
          }
    });

    const subscription2 = API.graphql(
      graphqlOperation(subscriptions.onUpdateContact)
    ).subscribe({
      next:
 
          async function getData() {
            const contactData = await API.graphql(graphqlOperation(listContacts));
            dispatch({ type: QUERY, contacts: contactData.data.listContacts.items });
          }
    });

    const subscription3 = API.graphql(
      graphqlOperation(subscriptions.onDeleteContact)
    ).subscribe({
      next:
 
          async function getData() {
            const contactData = await API.graphql(graphqlOperation(listContacts));
            dispatch({ type: QUERY, contacts: contactData.data.listContacts.items });
          }
    });

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
