import { Container, IconButton, Card } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AddRecipeForm from "../components/Recipe/AddRecipeForm";
import { useRouter } from "next/router";
import ArrowBack from "@mui/icons-material/ArrowBack";
import React from "react";
import { useTranslation } from "next-i18next";

const AddRecipe = () => {
  const router = useRouter();
  const { t } = useTranslation();

  function handlePrevious() {
    router.push("/Recipes");
  }
  return (
    <React.Fragment>
      <IconButton onClick={handlePrevious}>
        <ArrowBack aria-label="previous" />
      </IconButton>
      <Card>
        <Container>
          <h1>{t("recipe.add")}</h1>
          <AddRecipeForm />
        </Container>
      </Card>
    </React.Fragment>
  );
};
export default AddRecipe;
export async function getStaticProps(props: { locale: string }) {
  const { locale } = props;
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
