import { Container, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import ArrowBack from "@mui/icons-material/ArrowBack";
interface RecipeLayoutProps {
  children: ReactNode;
}

const RecipeLayout = (props: RecipeLayoutProps) => {
  const { children } = props;
  const router = useRouter();
  function handlePrevious() {
    router.push("/Recipes");
  }
  return (
    <Container>
      <IconButton onClick={handlePrevious}>
        <ArrowBack aria-label="previous" />
      </IconButton>
      {children}
    </Container>
  );
};

export default RecipeLayout;
