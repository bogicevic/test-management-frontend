import React, { Component, Fragment } from 'react';
import { Route } from 'react-router';
import { inject, observer } from 'mobx-react';

import SignInPage from './pages/signin/SignInPage';
import SignUpPage from './pages/signup/SignUpPage';
import TestsPage from './pages/testItems/TestsPage';
import CreateTestPage from './pages/create-test/CreateTestPage';

@inject('routerStore')
@observer
class App extends Component {
    render() {
        return (
            <Fragment>
                <Route exact path='/' component={SignInPage} />
                <Route path='/signin/' component={SignInPage} />
                <Route path='/signup/' component={SignUpPage} />
                <Route exact path='/tests' component={TestsPage} />
                <Route exact path='/tests/create' component={CreateTestPage} />
            </Fragment>
        );
    }
}

export default App;
