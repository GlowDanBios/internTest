import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {action, computed, configure, makeAutoObservable, observable} from "mobx"
import Data from "./testData.json"
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import './index.css';
// @ts-ignore
import App from "./App.tsx";
// @ts-ignore
import Authorisation from "./routes/aurhorisation.tsx";
// @ts-ignore
import DataTable from "./routes/table.tsx";
// @ts-ignore
import Material from "./routes/material.tsx"
// @ts-ignore
import Header from "./components/header.tsx";

configure({enforceActions: "observed"});

interface jsonData {
    accountId: string
    caseUid: string,
    creationDate: string
    publicId: string
    status: string
    reference: string
}

interface StoreInterface {
    login: string | null;
    password: string;
    errorLogin: boolean;
    jsonData: jsonData[];
    filteredData: jsonData[];
    filterInputValue: string;
    filtered: boolean;
    page: number;
    elementsPerPage: number;

    changeLogin: (newLogin: string) => void;

    changePassword: (newPass: string) => void;

    errorOnLogin: (val: boolean) => void;

    getElement(caseId: string | undefined): jsonData | undefined;

    setFiltered(val: boolean): void;

    changeFilterInput(val: string): void

    filterData(newData: jsonData[]): void;

    changePage(val: number): void;

    changePagination(num: number): void;

}

export {jsonData, StoreInterface};

class Store implements StoreInterface {
    @observable login = localStorage.getItem('login') !== undefined ? localStorage.getItem('login') : '';
    @observable password = '';
    @observable errorLogin = false;
    jsonData: jsonData[] = Data;
    @observable filteredData: jsonData[] = this.jsonData;
    @observable filterInputValue = '';
    @observable filtered = false;
    @observable page = 0;
    @observable elementsPerPage = 5;

    constructor() {
        makeAutoObservable(this);
    }

    @action changeLogin(newLogin: string) {
        this.login = newLogin;
    }

    @action changePassword(newPass: string) {
        this.password = newPass;
    }

    @action errorOnLogin(val: boolean) {
        this.errorLogin = val;
    }

    @computed getElement(caseId: string) {
        for (let i = 0; i < this.jsonData.length; i++) {
            if (this.jsonData[i].caseUid === caseId) {
                return this.jsonData[i];
            }
        }
    };

    @action setFiltered(val: boolean) {
        this.filtered = val;
    }

    @action changeFilterInput(val: string) {
        this.filterInputValue = val;
    }

    @action filterData(newData: jsonData[]) {
        this.filteredData = newData;
    }

    @action changePage(val: number) {
        if (val < Math.ceil(this.filteredData.length / this.elementsPerPage) && val > -1) {
            this.page = val;
        }
    }

    @action changePagination(num: number) {
        this.page = 0;
        this.elementsPerPage = num;
    }

}

const myStore: StoreInterface = new Store();


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/login",
        element: <Authorisation store={myStore}/>,
    },
    {
        path: "/table",
        element: <><Header store={myStore}/><DataTable store={myStore}/></>,
    },
    {
        path: "elements/:elementId",
        element: <><Header store={myStore}/><Material store={myStore}/></>,
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as Element);
root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
