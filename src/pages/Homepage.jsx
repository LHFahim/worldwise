import { Link } from "react-router-dom";
import AppNav from "../components/AppNav/AppNav";
import PageNav from "../components/PageNav/PageNav";

function Homepage() {
  return (
    <div>
      <PageNav />
      <AppNav />
      <h1>Welcome to the Homepage</h1>

      <Link to={`/app`}>APP</Link>
    </div>
  );
}

export default Homepage;
