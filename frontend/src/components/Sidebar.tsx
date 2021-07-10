export interface Props {}

const Sidebar: React.FunctionComponent<Props> = () => {
    return (
        <ul className='nav flex-column'>
            <li className='nav-item'>
                <a href='/project-list' className='nav-link'>
                    Project list
                </a>
            </li>
            <li className='nav-item'>
                <a href='/new-project' className='nav-link'>
                    New
                </a>
            </li>
            <li className='nav-item'>
                <a href='/project' className='nav-link'>
                    Project
                </a>
            </li>
            <li className='nav-item'>
                <a href='/customer' className='nav-link'>
                    Customer
                </a>
            </li>
        </ul>
    );
};

export default Sidebar;
