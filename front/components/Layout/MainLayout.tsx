import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../../src/theme";
import { Box } from "@mui/material";
import MainNavBar from "./MainNavBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <Box>
        <CssBaseline />
        <MainNavBar />
        <main>{children}</main>
      </Box>
    </ThemeProvider>
  );
};

export default MainLayout;
