import React, { Fragment } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { compose } from 'recompose';
import { Link, Stepper, Step, StepLabel, Tooltip, Typography, withStyles } from '@material-ui/core';

import { withApiClient } from '../decorators';
import { agentRequiresSetup } from '../services/agentService';

const styles = theme => ({});

const AgentProgress = ({ agent, clients }) => {
  const requiresSetup = agentRequiresSetup(agent);
  const hasClients = clients && clients.now > 0;

  const activeStep = requiresSetup ? 1 : !hasClients ? 2 : 3;

  return (
    <Fragment>
      <Stepper activeStep={activeStep}>
        <Step>
          <Tooltip title="Sign up to our awesome application">
            <StepLabel>
              <Link component={RouterLink} to="/app">
                Sign up
              </Link>
            </StepLabel>
          </Tooltip>
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
          <Tooltip title="Add your first client">
            <StepLabel>
              <Link component={RouterLink} to="/app/clients">
                Add Client
              </Link>
            </StepLabel>
          </Tooltip>
        </Step>
        {/* <Step>
        <StepLabel>Gift Client</StepLabel>
      </Step> */}
      </Stepper>
      {activeStep === 1 && (
        <Typography>Please complete your business and personal details.</Typography>
      )}
      {activeStep === 2 && (
        <Typography>This does not quite work unless you have some clients.</Typography>
      )}
    </Fragment>
  );
};

export default compose(
  withStyles(styles),
  withApiClient
)(AgentProgress);
