import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  alpha,
} from '@mui/material';
import PropTypes from 'prop-types';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';

function ExercisesTable(props) {
  const {
    exercises,
    selectedCategory,
    order,
    orderBy,
    page,
    rowsPerPage,
    dense,
    handleDeleteExercises,
    handleChangePage,
    handleChangeRowsPerPage,
    handleSelectAllClick,
    handleRequestSort,
  } = props;

  const headCells = [
    {
      id: 'exercise_name',
      numeric: false,
      disablePadding: true,
      label: 'Nazwa ćwiczenia',
      color: '#fffff'
    },
    {
      id: 'description',
      numeric: false,
      disablePadding: false,
      label: 'Opis',
    },
    {
      id: 'category_name',
      numeric: true,
      disablePadding: false,
      label: 'Kategoria',
    },
  ];

  const filteredExercises = exercises.filter((exercise) =>
    selectedCategory === 'all' ? true : exercise.category_name === selectedCategory
  );

  function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;

    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox"></TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              sx={{color:'#ffd93b'}}
            >
              {headCell.id === 'description' ? (
                <span>{headCell.label}</span>
              ) : (
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Wszystkie ćwiczenia
          </Typography>
        )}


        {numSelected > 0 && (
          <Tooltip title="Usuń">
            <IconButton onClick={handleDeleteExercises}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
      </Toolbar>
    );
  }

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  return (
    <Box>
      <EnhancedTableToolbar />
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size={dense ? 'small' : 'medium'}
        >

          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={exercises.length}
          />

<TableBody>
  {filteredExercises.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
    const labelId = `enhanced-table-checkbox-${index}`;

    return (
      <TableRow
        hover
        role="checkbox"
        tabIndex={-1}
        key={row.id}
        sx={{ cursor: 'pointer' }}
      >
        <TableCell padding="checkbox"></TableCell>
        <TableCell component="th" id={labelId} scope="row" padding="none" sx={{ color: '#ffd93b' }}>
          {row.exercise_name}
        </TableCell>
        <TableCell sx={{ color: '#ffd93b' }}>{row.description}</TableCell>
        <TableCell align="right"  sx={{ color: '#ffd93b' }}>{row.category_name}</TableCell>
      </TableRow>
    );
  })}
</TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredExercises.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{color:'#ffd93b'}}
        />
      </TableContainer>
    </Box>
  );
}

export default ExercisesTable;
