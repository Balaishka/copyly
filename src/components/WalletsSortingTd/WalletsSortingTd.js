import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

function WalletsSortingTd({ link, text }) {
  return (
    <td>
      <NavLink className="main__table-link" to={`/wallet/${link}`}>
        {text}
      </NavLink>
    </td>
  );
}

export default WalletsSortingTd;
