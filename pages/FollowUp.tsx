import { Box, Container } from "@mui/material";
import { useLocalStorage } from "usehooks-ts";
import DailyMeals from "../src/Models/DailyMeals";
import LocalStorageKeys from "../src/Models/LocalStorageKeys";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const FollowUp = () => {
  const [storedDailies] = useLocalStorage<DailyMeals[]>(
    LocalStorageKeys.Recipes,
    []
  );
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
        WIP
      </Box>
    </Container>
  );
};

export default FollowUp;
export async function getStaticProps(props: { locale: string }) {
  const { locale } = props;
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
