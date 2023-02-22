import { Container, Box } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import MyRecipes from "../components/Recipe/MyRecipes";
const Recipes = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MyRecipes />
      </Box>
    </Container>
  );
};

export default Recipes;
export async function getStaticProps(props: { locale: string }) {
  const { locale } = props;
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
