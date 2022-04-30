import { IconButton, ListItem, ListItemText } from "@mui/material";
import Recipe from "../../src/Models/Recipe";
import { useTranslation } from "next-i18next";
import EditIcon from "@mui/icons-material/Edit";
import TotalFood from "../../src/Models/TotalMeal";

interface MyRecipesListItemProps {
  recipe: Recipe;
}

const MyRecipesListItem = (props: MyRecipesListItemProps) => {
  const { recipe } = props;
  const total = new TotalFood(recipe.foods);
  const { t } = useTranslation();
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete">
          <EditIcon color="primary" />
        </IconButton>
      }
    >
      <ListItemText
        primary={recipe.name}
        secondary={`${total.calories} ${t("calories")}`}
      />
    </ListItem>
  );
};

export default MyRecipesListItem;
