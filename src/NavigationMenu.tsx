import { css } from "@emotion/css";

const NavigationMenu = () => {
  return (
    <nav className={navigationMenuStyles}>
      <ul>
        <li>Galaxy</li>
        <li>Technology</li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;

const navigationMenuStyles = css`
  display: flex;
  align-items: center;
  padding: 16px 0;
  font-size: 2rem;
  ul {
    display: flex;
    gap: 16px;
  }
`;
