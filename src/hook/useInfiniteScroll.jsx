import { useState, useEffect } from "react";

export default function useInfiniteScroll(fetchCallback) {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      setIsFetching(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!isFetching) {
      return;
    }
    fetchCallback();
  }, [isFetching]);

  return [isFetching, setIsFetching];
}
