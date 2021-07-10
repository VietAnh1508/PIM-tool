export interface Props {}

const Header: React.FunctionComponent<Props> = () => {
    return (
        <nav className='navbar navbar-expand-lg'>
            <div className='container-fluid'>
                <a
                    href='/'
                    className='navbar-brand me-auto fw-bolder text-secondary'
                >
                    <img src='elca-logo.jpg' alt='' width='40' height='40' />
                    <span className='ms-2'>Elca Information Management</span>
                </a>
                <ul className='navbar-nav me-5'>
                    <li className='nav-item'>
                        <a href='/lang-en' className='nav-link'>
                            EN
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a href='/lang-fr' className='nav-link'>
                            FR
                        </a>
                    </li>
                </ul>
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <a href='/help' className='nav-link'>
                            Help
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a href='/logout' className='nav-link'>
                            Log out
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
