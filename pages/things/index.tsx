import { GetServerSideProps } from 'next'

import axios from 'axios'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { Thing } from '../../interfaces'
import Layout from '../../components/Layout'
import ThingCard from '../../components/ThingCard'

import config from '../../config.json';

const BACKEND_URL = config.BACKEND_URL;

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  }
}));

type Props = {
  things: Thing[]
}

const ThingsOverview = ({ things }: Props) => {
  const classes = useStyles();

  return (
    <Layout title="Things">
      <Grid container className={classes.container} spacing={3}>
        {things.map(thing => {
          return (<Grid item xs={12} md={6} lg={4}>
            <ThingCard thing={thing} backendUrl={BACKEND_URL}></ThingCard>
          </Grid>)
        })}
      </Grid>
    </Layout>
  )
}

export default ThingsOverview

export const getServerSideProps: GetServerSideProps = async () => {
  const url = `${BACKEND_URL}/api/things`;
  const response = await axios.get(url);
  const things = response.data as Thing[];
  
  return {
    props: {
      things
    }
  }
}