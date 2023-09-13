import { useEffect } from "react";

const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return null;
};

export default useScrollToTop;
