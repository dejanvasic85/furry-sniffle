import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  List,
  Divider
} from '@material-ui/core';

import EmailInteraction from './EmailInteraction';

class ClientEmails extends React.Component {
  render() {
    const { emails } = this.props;

    return (
      <Card>
        <CardHeader title="Interactions" />
        <Divider />
        <CardContent>
          {
            <List>
              { emails.map(e => (<EmailInteraction email={e} key={e.id} />)) }
            </List>
          }
        </CardContent>
      </Card>
    );
  }
}

export default ClientEmails;
