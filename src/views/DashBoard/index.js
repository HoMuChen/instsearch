import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Dashboard as DashboardLayout } from 'layouts';
import {
  ArrowDownward as ArrowDownwardIcon,
  LocationOn as LocationOnIcon,
  People as PeopleIcon,
  ArtTrack as ArtTrackIcon,
} from '@material-ui/icons';
import { red, green, blue } from 'common/colors';

import Statistics from 'components/charts/Statistics';
import LineChart from 'components/charts/LineChart';

const styles = theme => ({
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
});

class Dashboard extends Component {
  render() {
    const { classes } = this.props;

    return (
      <DashboardLayout title="Dashboard">
        <div className={classes.root}>
          <Grid container spacing={4}>
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <Statistics
                title='近30天貼文總數'
                number='345,021'
                postfix='則'
                titleIcon={<ArtTrackIcon className={classes.icon}/>}
                titleIconColor={red}
              />
            </Grid>
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <Statistics
                title='使用者總數'
                number='350,213'
                postfix='人'
                titleIcon={<PeopleIcon className={classes.icon}/>}
                titleIconColor={blue}
              />
            </Grid>
            <Grid item lg={4} sm={6} xl={4} xs={12}>
              <Statistics
                title='地標總數'
                number='130,649'
                titleIcon={<LocationOnIcon className={classes.icon}/>}
                titleIconColor={green}
              />
            </Grid>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <LineChart
                title='地標總數'
                data={{}}
              />
            </Grid>
          </Grid>
        </div>
      </DashboardLayout>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
