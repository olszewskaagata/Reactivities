import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';

export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search'>
                    Could not find.
                </Icon>
                <Segment.Inline>
                    <Button as={Link} to='/activities' primary/>
                    Return to activities page
                </Segment.Inline>
            </Header>
        </Segment>
    )
}