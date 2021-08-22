import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export interface Props {
    headers: string[];
    items: any[];
    id: string;
    editLink?: string;
    linkColumn?: string;
    deleteItem: (id: any) => void;
}

const DataTable: React.FunctionComponent<Props> = (props) => {
    const { t } = useTranslation();

    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    const handleRowSelected = (e: React.FormEvent<HTMLInputElement>) => {
        const id: number = Number(e.currentTarget.value);
        if (e.currentTarget.checked) {
            setSelectedItems([...selectedItems, id]);
        } else {
            setSelectedItems(selectedItems.filter((item) => item !== id));
        }
    };

    const nbOfSelectedItem = selectedItems.length;

    return (
        <table className='table table-bordered'>
            <thead>
                <tr>
                    <th></th>
                    {props.headers.map((header, idx) => (
                        <th key={`h-${idx}`}>{header}</th>
                    ))}
                    <th className='text-center'>{t('label.delete')}</th>
                </tr>
            </thead>
            <tbody>
                {props.items.map((row, idx) => (
                    <tr key={`r-${idx}`}>
                        {Object.entries(row).map(
                            ([key, value]: [any, any], idx) => {
                                const itemKey = `v-${key}-${idx}`;
                                if (key === props.id) {
                                    return (
                                        <td
                                            key={itemKey}
                                            className='text-center'
                                        >
                                            <input
                                                className='form-check-input'
                                                type='checkbox'
                                                value={value}
                                                onChange={handleRowSelected}
                                            />
                                        </td>
                                    );
                                } else if (key === props.linkColumn) {
                                    return (
                                        <td key={itemKey}>
                                            <Link
                                                to={`${props.editLink}${
                                                    row[props.id]
                                                }`}
                                                className='nav-link'
                                            >
                                                {value}
                                            </Link>
                                        </td>
                                    );
                                }

                                return <td key={itemKey}>{value}</td>;
                            }
                        )}
                        <td className='text-center'>
                            <button
                                className='btn btn-link text-danger'
                                onClick={() => props.deleteItem(row[props.id])}
                            >
                                <i className='bi bi-trash'></i>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={6}>
                        <div className='row justify-content-between'>
                            <div className='col-3 ms-3'>
                                {t('label.itemSelected', {
                                    count: nbOfSelectedItem
                                })}
                            </div>
                            <div className='col-3'>
                                <button className='btn btn-link text-danger text-decoration-none'>
                                    {t('label.deleteSelectedItem', {
                                        count: nbOfSelectedItem
                                    })}
                                    <i className='bi bi-trash ms-2'></i>
                                </button>
                            </div>
                        </div>
                    </td>
                </tr>
            </tfoot>
        </table>
    );
};

export default DataTable;
