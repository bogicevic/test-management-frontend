import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Fab, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SignOutIcon from '@material-ui/icons/ExitToApp';
import styled from 'styled-components';
import Test from '../../components/Test';
import TestsFilters from '../../components/TestsFilters';

const TestsWrapper = styled.div`
    width: 100%;
    max-width: 860px;
    margin: auto;
    padding: 20px;
    box-sizing: border-box;
`;

const TestsHeader = styled.div`
    display: flex;
    justify-content: center;
    border-bottom: 3px solid #757c87;
`;

const Title = styled.h1`
    width: 100%;
    color: #edf4ff;
`;

const CreateButtonContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const TestsContainer = styled.div`
    padding-top: 20px;
`;

const EmptyTestsPlaceholder = styled.p`
    color: #edf4ff;
    text-align: center;
    font-size: 22px;
`;

const SignOutIconContainer = styled.div`
    margin-left: 10px;

    .signOutIcon {
        fill: #edf4ff;
    }
`;

@inject('testsStore', 'routerStore', 'userStore')
@observer
class TestsPage extends Component {
    componentDidMount() {
        this.props.testsStore.fetchTests();
    }

    handleSignOut = () => {
        const { userStore, testsStore, routerStore } = this.props;
        userStore.signout();
        testsStore.resetTests();
        routerStore.push('/signin');
    };

    renderTests = () => {
        const { testsStore } = this.props;

        if (!testsStore.tests.length) {
            return <EmptyTestsPlaceholder>No tests available</EmptyTestsPlaceholder>;
        }

        return testsStore.tests.map((test) => (
            <Test
                key={test.id}
                id={test.id}
                doorsId={test.doorsId}
                description={test.description}
                status={test.status}
            />
        ));
    };

    render() {
        return (
            <TestsWrapper>
                <TestsHeader>
                    <Title>Get things done.</Title>

                    <CreateButtonContainer>
                        <Fab variant='extended' onClick={() => this.props.routerStore.push('/tests/create')}>
                            <AddIcon />
                            Create Test
                        </Fab>

                        <SignOutIconContainer>
                            <IconButton onClick={this.handleSignOut}>
                                <SignOutIcon className='signOutIcon' />
                            </IconButton>
                        </SignOutIconContainer>
                    </CreateButtonContainer>
                </TestsHeader>

                <TestsFilters />

                <TestsContainer>{this.renderTests()}</TestsContainer>
            </TestsWrapper>
        );
    }
}

export default TestsPage;
