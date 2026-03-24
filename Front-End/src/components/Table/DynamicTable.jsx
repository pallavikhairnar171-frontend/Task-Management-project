import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { MdAddTask } from "react-icons/md";
import React from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

export const DynamicTable = ({ columns, rows, onEdit, onDelete,onTaskAdd }) => {
  console.log(rows,columns,"=========>")
  return (
    <div>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.field}>{col.headerName}</TableCell>
              ))}
              {(onDelete || onEdit) && (
                <TableCell align="right">Actions</TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row._id}>
                {columns.map((col) => (
                  <TableCell key={col.field}>
                    {col.render ? col.render(row) : row[col.field]}
                  </TableCell>
                ))}
               
                {(onDelete || onEdit) && (
                  <TableCell align="right">
                    {
                      onTaskAdd &&(
                        <IconButton className="icon" onClick={() => onTaskAdd(row)}>
                          <MdAddTask />
                        </IconButton>
                      )
                    }
                    {onEdit && (
                      <IconButton className="icon" onClick={() => onEdit(row)}>
                        <FaEdit />
                      </IconButton>
                    )}
                    {onDelete && (
                      <IconButton className="icon" onClick={() => onDelete(row)}>
                        <FaTrashAlt />
                      </IconButton>
                    )}
                    
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
