import { serverSideTranslations } from "next-i18next/serverSideTranslations";
const Recipes = () => {
  return <div>RECIPES</div>;
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
