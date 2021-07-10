import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Content from './components/Content';

function App() {
    return (
        <div className='container'>
            <div className='row border-bottom'>
                <Header />
            </div>
            <div className='row d-flex'>
                <div className='col border-end'>
                    <Sidebar />
                </div>
                <div className='col-10'>
                    <Content />
                </div>
            </div>
        </div>
    );
}

export default App;
