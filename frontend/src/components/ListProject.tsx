import { useHistory } from 'react-router';

export interface Props {}

const ListProject: React.FunctionComponent<Props> = () => {
    const history = useHistory();

    const handleNewBtnClick = () => {
        history.push('/project/new');
    };

    return (
        <div className='container-fluid'>
            <div className='row mt-3 mb-5 border-bottom'>
                <h5 className='mb-2'>List project</h5>
            </div>
            <button className='btn btn-primary' onClick={handleNewBtnClick}>
                New
            </button>
        </div>
    );
};

export default ListProject;
