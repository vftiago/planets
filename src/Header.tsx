import { css } from "@emotion/css";

const Header = () => {
  return <header className={appHeaderStyles}>Planets!</header>;
};

export default Header;

const appHeaderStyles = css`
  display: flex;
  align-items: center;
  padding: 16px 0;
  font-size: 3rem;
`;
