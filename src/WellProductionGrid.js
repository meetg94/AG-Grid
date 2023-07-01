import { useState } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import { wellData } from './wellData';

const WellProductionGrid = () => {
    const [columnDefs] = useState([
        { headerName: "Well ID", field: "wellId", sortable: true, filter: true, resizable: true },
        { headerName: "Location", field: "location", sortable: true, filter: true, resizable: true },
        { headerName: "Drilling Date", field: "drillingDate", sortable: true, filter: true, resizable: true },
        { 
            headerName: "Daily Production", 
            field: "dailyProduction", 
            sortable: true, 
            filter: true,
            valueFormatter: params => params.value.toLocaleString(),
            editable: true,
            cellStyle: { 'background-color': '#e6f7ff' },
            resizable: true
        },
        { 
            headerName: "Total Production", 
            field: "totalProduction", 
            sortable: true, 
            filter: true,
            valueFormatter: params => params.value.toLocaleString(),
            editable: true,
            cellStyle: { 'background-color': '#e6f7ff' },
        },
    ]);

    const [rowData] = useState(wellData);
    const [pageSize, setPageSize] = useState(10);
    const [gridApi, setGridApi] = useState(null);

    const onSelectionChanged = () => {
        if (gridApi) {
            let selectedRows = gridApi.getSelectedRows();
            console.log('Selected Rows: ', selectedRows);
        }
    };

    const onExportClick = () => {
        gridApi.exportDataAsCsv();
    };

    return (
    <div className="ag-theme-alpine" style={{ height: 600, width: 1200 }}>
        <button onClick={onExportClick}>Export to CSV</button>
        <AgGridReact
            className='ag-theme-alpine'
            columnDefs={columnDefs}
            rowData={rowData}
            pagination={true}
            paginationPageSize={pageSize}
            defaultColDef={{ flex: 1 }}
            rowSelection='multiple'
            rowMultiSelectWithClick = {true}
            onGridReady={params => setGridApi(params.api)}
            onSelectionChanged={onSelectionChanged}
        />
    </div>
    );
};

export default WellProductionGrid;