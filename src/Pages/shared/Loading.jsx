import React from 'react';
import Container from '../shared/Container';

const Loading = () => {
    return (
        <Container>
            <div className='min-h-screen'>
                <span className="loading loading-ring loading-xl"></span>
            </div>
        </Container>
    );
};

export default Loading;