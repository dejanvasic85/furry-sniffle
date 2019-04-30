import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  List,
  Divider
} from '@material-ui/core';

import GiftListItem from './GiftListItem';

class ClientGifts extends React.Component {
  render() {
    const { gifts } = this.props;

    return (
      <Card>
        <CardHeader title="Gift Cards" />
        <Divider />
        <CardContent>
          {
            <List>
              {gifts.map(gift => (
                <GiftListItem giftDetails={gift} key={gift.id} onClick={() => {console.log('Shrug- what should happen?')}} />
              ))}
            </List>
          }
        </CardContent>
      </Card>
    );
  }
}

export default ClientGifts;
