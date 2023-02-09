import React from 'react';
import {useParams} from 'react-router';
import {Link, useNavigate} from "react-router-dom";
import {Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,} from "@material-ui/core";
import {observer} from "mobx-react"
import {StoreInterface} from "../index";

const Material = observer(({store}:{store:StoreInterface}) => {
    const navigate = useNavigate();
    if (localStorage.getItem('allowed') !== 'True') {
        navigate('/login');
    }

    const {elementId} = useParams();

    return <Container>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <strong>
                            accountId
                            </strong>
                        </TableCell>
                        <TableCell>
                            <strong>
                            caseUid
                            </strong>
                        </TableCell>
                        <TableCell>
                            <strong>
                            creationDate
                            </strong>
                        </TableCell>
                        <TableCell>
                            <strong>
                                publicId
                            </strong>
                        </TableCell>
                        <TableCell>
                            <strong>
                                status
                            </strong>
                        </TableCell>
                        <TableCell>
                            <strong>
                            reference
                            </strong>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{store.getElement(elementId).accountId}</TableCell>
                        <TableCell>{store.getElement(elementId).caseUid}</TableCell>
                        <TableCell>{store.getElement(elementId).creationDate}</TableCell>
                        <TableCell>{store.getElement(elementId).publicId}</TableCell>
                        <TableCell>{store.getElement(elementId).status}</TableCell>
                        <TableCell>{store.getElement(elementId).reference}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
        <br/>
        <Link to='/table'>Back to the table</Link>
    </Container>
});
export default Material;
