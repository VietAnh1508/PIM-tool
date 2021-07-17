import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Alert from './components/Alert';
import ListProject from './components/ListProject';
import EditProject from './components/EditProject';
import ListEmployee from './components/ListEmployee';
import EditEmployee from './components/EditEmployee';

function App() {
    return (
        <Router>
            <div className='container'>
                <div className='row border-bottom'>
                    <Header />
                </div>
                <div className='row d-flex'>
                    <div className='col border-end'>
                        <Sidebar />
                    </div>
                    <div className='col-10'>
                        <Alert />
                        <Switch>
                            <Route path='/project/new'>
                                <EditProject />
                            </Route>
                            <Route path='/project/edit'>
                                <EditProject />
                            </Route>
                            <Route path='/project'>
                                <ListProject />
                            </Route>
                            <Route path='/employee/new'>
                                <EditEmployee />
                            </Route>
                            <Route path='/employee/edit'>
                                <EditEmployee />
                            </Route>
                            <Route path='/employee'>
                                <ListEmployee />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
