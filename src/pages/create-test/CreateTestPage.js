import React, { Component } from 'react';
import { TextField, FormControl, Button } from '@material-ui/core';
import styled from 'styled-components';
import { inject } from 'mobx-react';
import ErrorMessage from '../../components/ErrorMessage';

const FormWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const FormContainer = styled.div`
    max-width: 480px;
    width: 100%;
    background-color: #edf4ff;
    padding: 30px;
    border-radius: 5px;
`;

@inject('testsStore', 'routerStore')
class CreateTestPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            doorsId: '',
            description: '',
            errorMessage: null,
        };
    }

    handleSubmitTest = async () => {
        const { testsStore, routerStore } = this.props;
        const { doorsId, description } = this.state;

        try {
            await testsStore.createTest(doorsId, description);
            routerStore.push('/tests');
        } catch (error) {
            const errorMessage = error.response.data.message;
            this.setState({ errorMessage });
        }
    };

    render() {
        return (
            <FormWrapper>
                <FormContainer>
                    <h1>Create a new test</h1>
                    <p>Provide information about the test you wish to complete.</p>

                    {this.state.errorMessage && <ErrorMessage message={this.state.errorMessage} />}

                    <FormControl fullWidth>
                        <TextField
                            label='Doors ID'
                            placeholder='Doors ID'
                            margin='normal'
                            variant='outlined'
                            onChange={(e) => this.setState({ doorsId: e.target.value })}
                        />
                    </FormControl>
                    <FormControl fullWidth>
                        <TextField
                            label='Description'
                            placeholder='Description'
                            multiline
                            rows='8'
                            margin='normal'
                            variant='outlined'
                            onChange={(e) => this.setState({ description: e.target.value })}
                        />
                    </FormControl>

                    <Button
                        style={{ marginTop: '10px' }}
                        fullWidth
                        variant='contained'
                        color='primary'
                        onClick={this.handleSubmitTest}
                    >
                        CREATE TEST
                    </Button>
                </FormContainer>
            </FormWrapper>
        );
    }
}

export default CreateTestPage;
