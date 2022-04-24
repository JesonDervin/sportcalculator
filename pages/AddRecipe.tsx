import { Container, Box, IconButton } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AddRecipeForm from "../components/Recipe/AddRecipeForm";
import { useRouter } from "next/router";
import ArrowBack from "@mui/icons-material/ArrowBack";

const AddRecipe = () => {
  const router = useRouter();

  function handlePrevious() {
    router.push("/Recipes");
  }
  return (
    <Container>
      <IconButton onClick={handlePrevious}>
        <ArrowBack aria-label="previous" />
      </IconButton>
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AddRecipeForm />
      </Box>
    </Container>
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
