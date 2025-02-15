import logo from "../../src/assests/images/logo.png";

export function Header() {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <ul>
        <li className="active">Events</li>
        <li>My Ticket</li>
        <li>About Project</li>
      </ul>
      <button>My Ticket &rarr;</button>
    </header>
  );
}
