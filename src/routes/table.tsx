import React from 'react';
import {observer} from "mobx-react"
import {Link, useNavigate} from "react-router-dom";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    TableFooter,
    TextField
} from "@material-ui/core";
import {StoreInterface} from "../index";

const DataTable = observer(({store}: { store: StoreInterface }) => {
    const navigate = useNavigate();
    if (localStorage.getItem('allowed') !== 'True') {
        navigate('/login');
    }

    function checkFilter(el: { reference: string; accountId: string; creationDate: string; publicId: string; status: string; }) {
        return el.reference.includes(store.filterInputValue) || el.accountId.includes(store.filterInputValue) || el.creationDate.includes(store.filterInputValue) || el.publicId.includes(store.filterInputValue) || el.status.includes(store.filterInputValue)
    }

    const listItems = store.filteredData.slice(store.page * store.elementsPerPage, (store.page + 1) * store.elementsPerPage).map((el: { publicId: string; caseUid: string; reference: string; accountId: string; creationDate: string; status: string; }) =>
        <TableRow key={el.publicId}>
            <TableCell><Link
                to={'/elements/' + el.caseUid}
            >{el.reference}</Link></TableCell>
            <TableCell>
                {el.accountId}
            </TableCell>
            <TableCell>
                {el.creationDate}
            </TableCell>
            <TableCell>
                {el.publicId}
            </TableCell>
            <TableCell>
                {el.status}
            </TableCell>
        </TableRow>
    );

    const [needUpdate, setUpdate] = React.useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        store.changeFilterInput(event.target.value)
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            store.setFiltered(store.filterInputValue !== '');
            setUpdate(true)
        }
    };

    const handlePerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        store.changePagination(parseInt(event.target.value))
    };

    const changePage = (event: any, newPage: number) => {
        store.changePage(newPage)
    };

    React.useEffect(() => {
        store.filterData(store.jsonData.filter((el: { reference: string; accountId: string; creationDate: string; publicId: string; status: string; }) => store.filtered ? checkFilter(el) : true));
        setUpdate(false);
    }, [needUpdate]);

    // @ts-ignore
    return <div style={{'margin-left': '10px'}}>
        <TextField onChange={handleChange} onKeyDown={handleKeyDown} value={store.filterInputValue}/>
        <TableContainer>
            <Table size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell><strong>reference</strong></TableCell>
                        <TableCell><strong>caseUid</strong></TableCell>
                        <TableCell><strong>creationDate</strong></TableCell>
                        <TableCell><strong>publicId</strong></TableCell>
                        <TableCell><strong>status</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listItems}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination count={store.filteredData.length} onPageChange={changePage} page={store.page}
                                         rowsPerPage={store.elementsPerPage} rowsPerPageOptions={[5, 10, 15, 20, 25]}
                                         onRowsPerPageChange={handlePerPageChange}/>
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>
    </div>
});


export default DataTable;
