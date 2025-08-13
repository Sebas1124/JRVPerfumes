// // En src/components/common/ReusableAgGridTable.tsx

// import { useMemo, useCallback, useEffect } from 'react';
// import { Box, SxProps, Theme } from '@mui/material';
// import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
// import { ColDef, GridReadyEvent } from 'ag-grid-community'; // Tipos necesarios
// // Ya no necesitas themeQuartz
// // import { themeQuartz } from 'ag-grid-community';
// // Módulo se registra globalmente o se pasa como prop (depende de tu setup final, asumamos que se pasa como prop como en el paso anterior)
// import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
// import { useThemeStore } from '../../store/themeStore';

// // Interface para las props
// interface ReusableAgGridTableProps<TData = any> extends AgGridReactProps {
//     columnDefs: ColDef<TData>[];
//     rowData: TData[] | null | undefined;
//     height?: string | number;
//     sx?: SxProps<Theme>;
//     modules?: any[]; // Mantenemos la prop por si acaso
// }

// // --- ELIMINA las definiciones de themeLigth y themeDark basadas en themeQuartz ---
// // const themeLigth = themeQuartz.withParams({ ... });
// // const themeDark = themeQuartz.withParams({ ... });

// export const ReusableAgGridTable = <TData extends {} = any>({
//     columnDefs,
//     rowData,
//     height = '400px',
//     domLayout = 'normal',
//     pagination = true,
//     paginationPageSize = 10,
//     defaultColDef: userDefaultColDef,
//     sx,
//     modules = [ClientSideRowModelModule], // Mantiene el default por si acaso
//     ...rest
// }: ReusableAgGridTableProps<TData>) => {

//     const { mode: themeMode } = useThemeStore();

//     // --- Determina la CLASE CSS correcta ---
//     const agGridThemeClass = themeMode === 'dark' ? 'ag-theme-alpine-dark' : 'ag-theme-alpine';

//     // Definiciones de columna por defecto
//     const defaultColDef = useMemo<ColDef>(() => ({
//         resizable: true, sortable: true, filter: true, minWidth: 100,
//         ...userDefaultColDef,
//     }), [userDefaultColDef]);

//     // Callback onGridReady
//     const onGridReady = useCallback((params: GridReadyEvent) => {
//         // Evita error si la API no está lista (ej: desmontaje rápido)
//         if (params.api) {
//              params.api.sizeColumnsToFit();
//         }
//         if (rest.onGridReady) {
//             rest.onGridReady(params);
//         }
//     }, [rest.onGridReady]);

//     // useEffect para cargar el tema del grid cuando se recarga la página
//     useEffect(() => {
//         if (themeMode === 'dark') {
//             document.body.classList.add('ag-theme-alpine-dark');
//         } else {
//             document.body.classList.remove('ag-theme-alpine-dark');
//         }

//         // CARGAR ESTLOS CSS DE AG-GRID AQUÍ SI ES NECESARIO

//         const gridDiv = document.querySelector('.ag-root-wrapper-body');
//         if (gridDiv) {
//             gridDiv.classList.add(agGridThemeClass); // Añade la clase del tema
//         }

//     }, [themeMode]); // Dependencia para el efecto


//     return (
//         // --- Aplica la CLASE CSS al contenedor ---
//         <Box sx={{ height, width: '100%', ...sx }}>
//             <AgGridReact<TData>
//                 className={agGridThemeClass} // Clase CSS para el tema
//                 modules={modules} // Pasa los módulos (importante si no usas registro global)
//                 rowData={rowData}
//                 columnDefs={columnDefs}
//                 defaultColDef={defaultColDef}
//                 pagination={pagination}
//                 paginationPageSize={paginationPageSize}
//                 domLayout={domLayout}
//                 onGridReady={onGridReady}
//                 {...rest}
//             />
//         </Box>
//     );
// };

// // Import useCallback
// // import { useCallback } from 'react'; (si no está ya importado)


export const ReusableAgGridTable = () => {
  return (
    <div>ReusableAgGridTable</div>
  )
}
