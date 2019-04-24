import React, { useState, useEffect } from 'react';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import qs from 'query-string';
import withApiClient from '../decorators/withApiClient';

const BadEntry = <div><Typography>It appears you are missing some information... Please contact your agent and obtain a new link for sharing.</Typography></div>;

function MessageProspect(props) {
  const { channel, referralCode } = qs.parse(props.location.search);

  if (!channel || !referralCode) {
    return <BadEntry />
  }

  const [invite, setInvite] = useState(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchReferral = async () => {
      const response = await props.api.invite({ referralCode });
      setInvite(response.invite);
      setIsFetching(false);
    }

    fetchReferral();

  }, []);

  if (isFetching) {
    return null;
  }

  const { agentName, clientReferralUrl } = invite;
  const message = `Hey, please leave your information for ${agentName} here ${clientReferralUrl} and he'll get back to you.`;

  switch (channel.toLowerCase()) {
    case 'whatsapp':
      encodeURIComponent()
      window.location = `whatsapp://send?text=${message}`;
      return null;
    default: {
      return <BadEntry />;
    }
  }
}

export default (
  compose(
    withRouter,
    withApiClient()
  )(MessageProspect)
);