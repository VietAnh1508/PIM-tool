import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Alert from './components/Alert';
import ListProject from './components/ListProject';
import EditProject from './components/EditProject';
import ListEmployee from './components/ListEmployee';
import EditEmployee from './components/EditEmployee';
import ListGroup from './components/ListGroup';
import EditGroup from './components/EditGroup';

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
                            <Route path='/project/:action/:id?'>
                                <EditProject />
                            </Route>
                            <Route path='/project'>
                                <ListProject />
                            </Route>
                            <Route path='/employee/:action/:id?'>
                                <EditEmployee />
                            </Route>
                            <Route path='/employee'>
                                <ListEmployee />
                            </Route>
                            <Route path='/group/:action/:id?'>
                                <EditGroup />
                            </Route>
                            <Route path='/group'>
                                <ListGroup />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
