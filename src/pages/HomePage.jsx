import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const HomePage = () => {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/todos')
    } else {
      navigate('/login')
    }
  }, [navigate, isAuthenticated])
};

export default HomePage;
