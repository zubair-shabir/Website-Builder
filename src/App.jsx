import "./App.css";
import WebsiteBuilder from "./WebsiteBuilder";

function App() {
  return (
    <>
      <div className="min-h-screen">
        <h1 className="text-center font-mono text-5xl py-5">
          AI Website Builder
        </h1>
        <div className="flex justify-center items-center ">
          <WebsiteBuilder />
        </div>
      </div>
    </>
  );
}

export default App;
