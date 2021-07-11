import { Link } from 'react-router-dom';

export interface Props {}

const Sidebar: React.FunctionComponent<Props> = () => {
    return (
        <ul className='nav flex-column'>
            <li className='nav-item'>
                <Link to='/list-project' className='nav-link'>
                    Project list
                </Link>
            </li>
            <li className='nav-item'>
                <Link to='/edit-project' className='nav-link'>
                    New
                </Link>
            </li>
            <li className='nav-item'>
                <Link to='/customer' className='nav-link'>
                    Customer
                </Link>
            </li>
        </ul>
    );
};

export default Sidebar;
