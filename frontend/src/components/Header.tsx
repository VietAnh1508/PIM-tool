import { useTranslation } from 'react-i18next';

const languages = ['en', 'fr'];

export interface Props {}

const Header: React.FunctionComponent<Props> = () => {
    const { t, i18n } = useTranslation();

    return (
        <nav className='navbar navbar-expand-lg'>
            <div className='container-fluid'>
                <a
                    href='/'
                    className='navbar-brand me-auto fw-bolder text-secondary'
                >
                    <img src='elca-logo.jpg' alt='' width='40' height='40' />
                    <span className='ms-2'>{t('label.mainTitle')}</span>
                </a>
                <ul className='navbar-nav me-5'>
                    {languages.map((lang) => (
                        <li key={lang} className='nav-item'>
                            <button
                                className={`btn btn-link text-decoration-none shadow-none ${
                                    i18n.language === lang ? 'fw-bold' : ''
                                }`}
                                onClick={() => i18n.changeLanguage(lang)}
                            >
                                {lang.toUpperCase()}
                            </button>
                        </li>
                    ))}
                </ul>
                <ul className='navbar-nav'>
                    <li className='nav-item'>
                        <a href='/help' className='nav-link'>
                            {t('label.help')}
                        </a>
                    </li>
                    <li className='nav-item'>
                        <a href='/logout' className='nav-link'>
                            {t('label.logout')}
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;
