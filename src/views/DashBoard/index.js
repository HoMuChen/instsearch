import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { Dashboard as DashboardLayout } from 'layouts';
import {
  LocationOn as LocationOnIcon,
  People as PeopleIcon,
  ArtTrack as ArtTrackIcon,
} from '@material-ui/icons';

import { red, green, blue } from 'common/colors';
import Statistics from 'components/Charts/Statistics';
import useSearch from 'hooks/useSearch';

import PostsByDay from './components/PostsByDay';
import TagsCount from './components/TagsCount';
import query from './query';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  },
  item: {
    height: '100%'
  },
  icon: {
    color: theme.palette.common.white,
    fontSize: '2rem',
    height: '2rem',
    width: '2rem'
  }
}));

function Dashboard() {
  const classes = useStyles();
  const { data: mediasData, isFetching, doSearch } = useSearch({
    endpoint: '/ig-medias/_search',
    body: query(),
  });

  return (
    <DashboardLayout title="Dashboard">
      <div className={classes.root}>
        <Grid container spacing={4}>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <Statistics
              title='近30天總貼文數'
              number={isFetching? 0: mediasData.hits.total.value}
              postfix='則'
              titleIcon={<ArtTrackIcon className={classes.icon}/>}
              titleIconColor={red}
            />
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <Statistics
              title='使用者總數'
              number={537292}
              postfix='人'
              titleIcon={<PeopleIcon className={classes.icon}/>}
              titleIconColor={blue}
            />
          </Grid>
          <Grid item lg={4} sm={6} xl={4} xs={12}>
            <Statistics
              title='地標總數'
              number={251125}
              titleIcon={<LocationOnIcon className={classes.icon}/>}
              titleIconColor={green}
            />
          </Grid>
          <Grid item lg={6} sm={12} xl={6} xs={12}>
            <PostsByDay />
          </Grid>
          <Grid item lg={6} sm={12} xl={6} xs={12}>
            <TagsCount />
          </Grid>
        </Grid>
      </div>
    </DashboardLayout>
  );
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Dashboard;
