import Landing from "../components/Landing";
import authCheck from "../hooks/authCheck";

function Home() {
  return (
    <div>
      <Landing />
    </div>
  );
}

export default authCheck(Home);
