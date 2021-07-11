import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ListProject from './components/ListProject';
import EditProject from './components/EditProject';

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
                        <Switch>
                            <Route path='/list-project'>
                                <ListProject />
                            </Route>
                            <Route path='/edit-project'>
                                <EditProject />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default App;
