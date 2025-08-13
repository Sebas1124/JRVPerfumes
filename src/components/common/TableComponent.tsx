import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Menu,
    MenuItem,
    useMediaQuery,
    useTheme,
    TextField,
    Box,
    Popover,
    FormControl,
    Select,
    InputLabel,
    Chip,
    type SelectChangeEvent,
    InputAdornment
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// Tipos para las columnas
interface TableColumn {
    id: string;
    label: string;
    align?: 'left' | 'right' | 'center';
    hideOnMobile?: boolean;
    renderCell?: (row: any) => React.ReactNode;
    filterable?: boolean; // Indica si la columna es filtrable
}

// Tipos para las acciones del menú
interface ActionMenuItem {
    icon: React.ReactElement;
    label: string;
    onClick: (id: string | number) => void;
}

// Props para el componente de tabla
interface TableComponentProps {
    data: any[];
    columns: TableColumn[];
    idField?: string;
    actions?: ActionMenuItem[];
    getStatusChipColor?: (status: string) => string;
    showActionsColumn?: boolean;
    searchable?: boolean; // Indica si la tabla permite búsqueda
}

export const TableComponent: React.FC<TableComponentProps> = ({
    data,
    columns,
    idField = 'id',
    actions = [],
    showActionsColumn = true,
    searchable = true
}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedId, setSelectedId] = useState<string | number | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);
    const [filterColumn, setFilterColumn] = useState<string | null>(null);
    const [filters, setFilters] = useState<Record<string, any>>({});
    const [filteredData, setFilteredData] = useState<any[]>(data);
    
    // Effect para actualizar datos filtrados cuando cambien los filtros o la búsqueda
    useEffect(() => {
        let result = [...data];
        
        // Aplicar filtros de columnas
        Object.keys(filters).forEach(columnId => {
            if (filters[columnId]) {
                result = result.filter(row => 
                    String(row[columnId]).toLowerCase().includes(String(filters[columnId]).toLowerCase())
                );
            }
        });
        
        // Aplicar búsqueda global
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(row => {
                return columns.some(column => {
                    const value = row[column.id];
                    return value && String(value).toLowerCase().includes(term);
                });
            });
        }
        
        setFilteredData(result);
    }, [data, filters, searchTerm]);
    
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string | number) => {
        setAnchorEl(event.currentTarget);
        setSelectedId(id);
    };
    
    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedId(null);
    };
    
    const handleFilterOpen = (event: React.MouseEvent<HTMLElement>, columnId: string) => {
        setFilterAnchorEl(event.currentTarget);
        setFilterColumn(columnId);
    };
    
    const handleFilterClose = () => {
        setFilterAnchorEl(null);
        setFilterColumn(null);
    };
    
    const handleFilterChange = (value: string) => {
        setFilters(prev => ({
            ...prev,
            [filterColumn!]: value
        }));
        handleFilterClose();
    };
    
    const handleClearFilter = (columnId: string) => {
        setFilters(prev => {
            const newFilters = { ...prev };
            delete newFilters[columnId];
            return newFilters;
        });
    };
    
    // Filtrar columnas basado en el estado móvil
    const visibleColumns = columns.filter(column => !column.hideOnMobile || !isMobile);
    
    // Generar opciones únicas para el filtro de la columna actual
    const getFilterOptions = (columnId: string) => {
        const uniqueValues = Array.from(new Set(data.map(row => row[columnId])));
        return uniqueValues.filter(Boolean);
    };
    
    return (
        <>
            {searchable && (
                <Box sx={{ mb: 2 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Buscar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                            endAdornment: searchTerm ? (
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setSearchTerm('')} edge="end">
                                        <ClearIcon />
                                    </IconButton>
                                </InputAdornment>
                            ) : null
                        }}
                    />
                </Box>
            )}
            
            {/* Chips de filtros activos */}
            {Object.keys(filters).length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {Object.keys(filters).map(columnId => (
                        <Chip
                            key={columnId}
                            label={`${columns.find(c => c.id === columnId)?.label}: ${filters[columnId]}`}
                            onDelete={() => handleClearFilter(columnId)}
                            color="primary"
                            variant="outlined"
                            size="small"
                        />
                    ))}
                </Box>
            )}
            
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            {visibleColumns.map((column) => (
                                <TableCell key={column.id} align={column.align || 'left'}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: column.align === 'right' ? 'flex-end' : 'flex-start' }}>
                                        {column.label}
                                        {column.filterable && (
                                            <IconButton 
                                                size="small" 
                                                onClick={(e) => handleFilterOpen(e, column.id)}
                                                color={filters[column.id] ? "primary" : "default"}
                                            >
                                                <FilterListIcon fontSize="small" />
                                            </IconButton>
                                        )}
                                    </Box>
                                </TableCell>
                            ))}
                            {showActionsColumn && actions.length > 0 && (
                                <TableCell align="center">Acciones</TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredData.length > 0 ? (
                            filteredData.map((row) => (
                                <TableRow key={row[idField]}>
                                    {visibleColumns.map((column, index) => (
                                        <TableCell 
                                            key={`${row[idField]}-${column.id}`} 
                                            align={column.align || 'left'}
                                            component={index === 0 ? 'th' : 'td'}
                                            scope={index === 0 ? 'row' : undefined}
                                        >
                                            {column.renderCell ? column.renderCell(row) : row[column.id]}
                                        </TableCell>
                                    ))}
                                    {showActionsColumn && actions.length > 0 && (
                                        <TableCell align="center">
                                            <IconButton 
                                                aria-label="more"
                                                onClick={(e) => handleMenuOpen(e, row[idField])}
                                            >
                                                <MoreVertIcon />
                                            </IconButton>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={visibleColumns.length + (showActionsColumn ? 1 : 0)} align="center">
                                    No se encontraron resultados
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            
            {/* Menú de acciones */}
            {actions.length > 0 && (
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                >
                    {actions.map((action, index) => (
                        <MenuItem 
                            key={index} 
                            onClick={() => {
                                if (selectedId !== null) {
                                    action.onClick(selectedId);
                                    handleMenuClose();
                                }
                            }}
                        >
                            {action.icon && React.cloneElement(action.icon as React.ReactElement)}
                            {action.label}
                        </MenuItem>
                    ))}
                </Menu>
            )}
            
            {/* Popover de filtros */}
            <Popover
                open={Boolean(filterAnchorEl)}
                anchorEl={filterAnchorEl}
                onClose={handleFilterClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Box sx={{ p: 2, minWidth: 200 }}>
                    <FormControl fullWidth>
                        <InputLabel>Filtrar</InputLabel>
                        <Select
                            value={filterColumn ? filters[filterColumn] || '' : ''}
                            onChange={(e: SelectChangeEvent) => handleFilterChange(e.target.value as string)}
                            label="Filtrar"
                        >
                            {filterColumn && getFilterOptions(filterColumn).map((option) => (
                                <MenuItem key={String(option)} value={String(option)}>
                                    {String(option)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Popover>
        </>
    );
};
