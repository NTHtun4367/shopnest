import { useEffect } from "react";
import { useNavigate } from "react-router";

function Cancelled() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/");
  }, []);

  return <div>Cancelled</div>;
}

export default Cancelled;
