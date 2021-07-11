import { useHistory } from 'react-router';

export interface Props {}

const ListEmployee: React.FunctionComponent<Props> = () => {
    const history = useHistory();

    const handleNewBtnClick = () => {
        history.push('/employee/new');
    };

    return (
        <div className='container-fluid'>
            <div className='row mt-3 mb-5 border-bottom'>
                <h5 className='mb-2'>List employee</h5>
            </div>
            <button className='btn btn-primary' onClick={handleNewBtnClick}>
                New
            </button>
        </div>
    );
};

export default ListEmployee;
