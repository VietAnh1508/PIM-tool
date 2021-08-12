import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export interface Props {}

const Sidebar: React.FunctionComponent<Props> = () => {
    const { t } = useTranslation();

    return (
        <ul className='nav flex-column'>
            <li className='nav-item'>
                <Link to='/project' className='nav-link'>
                    {t('label.project')}
                </Link>
            </li>
            <li className='nav-item'>
                <Link to='/employee' className='nav-link'>
                    {t('label.employee')}
                </Link>
            </li>
            <li className='nav-item'>
                <Link to='/group' className='nav-link'>
                    {t('label.group')}
                </Link>
            </li>
        </ul>
    );
};

export default Sidebar;
