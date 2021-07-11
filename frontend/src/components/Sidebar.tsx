import { Link } from 'react-router-dom';

export interface Props {}

const Sidebar: React.FunctionComponent<Props> = () => {
    return (
        <ul className='nav flex-column'>
            <li className='nav-item'>
                <Link to='/project' className='nav-link'>
                    Project
                </Link>
            </li>
            <li className='nav-item'>
                <Link to='/employee' className='nav-link'>
                    Employee
                </Link>
            </li>
            <li className='nav-item'>
                <Link to='/group' className='nav-link'>
                    Group
                </Link>
            </li>
        </ul>
    );
};

export default Sidebar;
