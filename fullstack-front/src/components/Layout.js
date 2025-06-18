import React from 'react';
import { Container } from '@mui/material';

const Layout = ({ children }) => {
    return (
        <Container style={{ marginTop: '2rem' }}>
            {children}
        </Container>
    );
};

export default Layout;