import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { MealType } from "../../src/Models/MealType";
import TotalMealTableProps from "../../src/Models/TotalMealTableProps";

export default function TotalMealTable(props: TotalMealTableProps) {
  const { total } = props;
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label={MealType.Total}>
        <TableHead>
          <TableRow>
            <TableCell align="center" colSpan={12}>
              {MealType.Total}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">Quantity (g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Calories</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <TableCell align="right">{total.quantity}</TableCell>
            <TableCell align="right">{total.protein}</TableCell>
            <TableCell align="right">{total.carbohydrate}</TableCell>
            <TableCell align="right">{total.lipid}</TableCell>
            <TableCell align="right">{total.calories}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
