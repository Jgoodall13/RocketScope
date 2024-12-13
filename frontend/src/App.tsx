import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000");
      const data = await response.json();
      setData(data);
    };
    console.log(data);
    fetchData();
  }, []);
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h1 className="text-3xl font-bold underline">
        Backend says...: {data?.message}
      </h1>
    </>
  );
}

export default App;
