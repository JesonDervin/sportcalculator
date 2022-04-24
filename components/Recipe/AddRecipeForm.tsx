import { useTranslation } from "next-i18next";
const AddRecipeForm = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("recipe.add")}</h1>
    </div>
  );
};
export default AddRecipeForm;
