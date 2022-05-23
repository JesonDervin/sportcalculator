import { Box, Container } from "@mui/material";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRecoilValue } from "recoil";
import DailyMeals from "../src/Models/DailyMeals";
import { storedDates } from "../src/State/DailyMeal";
import { useState, useEffect } from "react";
import DailyTotal from "../components/Daily/DailyTotal";

const FollowUp = () => {
  const storedDate = useRecoilValue(storedDates);
  const [currentDates, setCurrentDates] = useState([] as string[]);
  useEffect(() => {
    setCurrentDates(storedDate);
  }, [storedDate]);

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
        {currentDates.map((date: string) => (
          <DailyTotal date={date} key={date} />
        ))}
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
