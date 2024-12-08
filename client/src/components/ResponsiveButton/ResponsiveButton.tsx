import Button, { ButtonProps } from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const ResponsiveButton = (props: ButtonProps) => {
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up("lg"));
  const tablet = useMediaQuery(theme.breakpoints.up("sm"));
  const mobile = useMediaQuery(theme.breakpoints.up("xs"));

  const sizes = () => {
    if (desktop) return "large";
    if (tablet) return "medium";
    if (mobile) return "small";
  };

  return <Button {...props} size={sizes()}/>;
};
export default ResponsiveButton;