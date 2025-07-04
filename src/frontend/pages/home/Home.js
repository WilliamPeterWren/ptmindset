import { useEffect } from "react";

function Home() {
  const pageTitle = "Trang chủ";

  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = "Peter";
    };
  }, [pageTitle]);

  return <div>Trang home</div>;
}

export default Home;
