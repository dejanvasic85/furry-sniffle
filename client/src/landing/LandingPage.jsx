import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from '@material-ui/core';

class LandingPage extends React.Component {
  render() {
    return <div>
      <Typography>
        Landing Page ... coming soon near you! <Link to="/app">Agent Login</Link>
      </Typography>
    </div>;
  }
}

export default LandingPage;