import React from "react";
import ReactDOM from 'react-dom';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

var example_Rows = [{name: 'Kostas', email: 'kostas@kostas.io', status: 'OK'},
    {name: 'Sebastian', email: 'seb@seb.io', status: 'OK'},
    {name: 'Joe', email: 'joseph@joe.io', status: 'http://www.example.com'}, // link to form
]

const Table = ({rows, cols}) => {
    const cols =  [
        { headerName: "Name",   field: "name", sortable: true },
        { headerName: "Email",  field: "email", sortable: true },
        { headerName: "Status", field: "status", sortable: true, cellRenderer: MyCellRenderer},
    ]
    return (
        <div className="ag-theme-balham" style={{width: '100%', height: '100%'}}>
            <AgGridReact
                columnDefs={cols}
                rowData={rows}>
            </AgGridReact>
        </div>
    )
}

function MyCellRenderer () {}

// gets called once before the renderer is used
MyCellRenderer.prototype.init = function(link) {
    this.eGui = document.createElement('div');
    this.eGui.innerHTML = (link.value == 'OK')
        ? '<span style="color: green">Completed</span>'
        : '<a href="' + link.value + '">Pending</a>'
};

MyCellRenderer.prototype.getGui = function() {
    return this.eGui;
};