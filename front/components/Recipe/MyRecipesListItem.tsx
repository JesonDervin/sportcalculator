import { IconButton, ListItemButton, ListItemText } from "@mui/material";
import Recipe from "../../src/Models/Recipe";
import { useTranslation } from "next-i18next";
import EditIcon from "@mui/icons-material/Edit";
import TotalFood from "../../src/Models/TotalFood";

interface MyRecipesListItemProps {
  recipe: Recipe;
  onEdit: () => void;
}

const MyRecipesListItem = (props: MyRecipesListItemProps) => {
  const { recipe, onEdit } = props;
  const total = new TotalFood(recipe.foods);
  const { t } = useTranslation();
  return (
    <ListItemButton onClick={onEdit} component="li">
      <ListItemText
        primary={recipe.name}
        secondary={`${total.calories} ${t("calories")}`}
      />
      <IconButton edge="end" aria-label="delete">
        <EditIcon color="primary" />
      </IconButton>
    </ListItemButton>
  );
};

export default MyRecipesListItem;
