import React from 'react';
import './App.css';
import awsconfig from './aws-exports';
import Header from  './components/Header';
import Body from  './components/Body';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import API from '@aws-amplify/api';

API.configure(awsconfig);



const useStyles = makeStyles(theme => ({
  body: {
    maxWidth: 1100,
    minWidth: 250,
  },
}));

function App() {
  const classes = useStyles();
  const [ contact, setContact ] = React.useState({
    id: '',
    firstName: '',
    lastName: '',
    home: '',
    mobile: '',
    work: '',
    type: '' 
});

  return (
    <div className="App"> 
        <Header contact={contact} setContact={setContact} />
        <Grid container justify="center">
          <Body className={classes.body} setContact={setContact} contact={contact} />
        </Grid>
    </div>
  );
}

export default App;
