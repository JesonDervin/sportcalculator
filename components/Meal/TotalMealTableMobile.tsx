import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";
import TotalMealTableProps from "../../src/Models/TotalMealTableProps";
import { useTranslation } from "next-i18next";

export default function TotalMealTableMobile(props: TotalMealTableProps) {
  const { total } = props;
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table size="small">
        <TableBody>
          <TableRow>
            <TableCell>
              {t("total")} {total.quantity}
              {t("unit.gramShort")}
            </TableCell>
            <TableCell>
              {total.calories}
              {t("caloriesShort")}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              {t("protein")}&nbsp;{total.protein}
              {t("unit.gramShort")}
            </TableCell>
            <TableCell>
              {t("carbs")}&nbsp;{total.carbohydrate}
              {t("unit.gramShort")}
            </TableCell>
            <TableCell>
              {t("fat")}&nbsp;{total.lipid}
              {t("unit.gramShort")}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
