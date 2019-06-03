import React, { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { compose } from 'recompose';
import { Link, Stepper, Step, StepLabel, Tooltip, Typography, withStyles } from '@material-ui/core';

import { withApiClient } from '../decorators';
import { agentRequiresSetup } from '../services/agentService';

const styles = theme => ({});

const AgentProgress = ({ agent }) => {
  const requiresSetup = agentRequiresSetup(agent);

  let activeStep = requiresSetup ? 1 : 2;

  return (
    <Fragment>
      <Stepper activeStep={activeStep}>
        <Step>
          <StepLabel>Sign up</StepLabel>
        </Step>
        <Step>
          <Tooltip title="Complete my account details.">
            <StepLabel>
              <Link component={RouterLink} to="/app/agent/details">
                Complete Details
              </Link>
            </StepLabel>
          </Tooltip>
        </Step>
        <Step>
          <StepLabel>
            <Link component={RouterLink} to="/app/clients">
              Add Client
            </Link>
          </StepLabel>
        </Step>
        {/* <Step>
        <StepLabel>Gift Client</StepLabel>
      </Step> */}
      </Stepper>

      <Typography>

      </Typography>
    </Fragment>
  );
};

export default compose(
  withStyles(styles),
  withApiClient
)(AgentProgress);
