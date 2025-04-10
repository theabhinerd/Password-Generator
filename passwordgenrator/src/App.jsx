import { useCallback, useEffect, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(10);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [upperCaseAllowed, setUpperCaseAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyz";

    if (upperCaseAllowed) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@^%$*&{[]}~';";

    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }

    setPassword(pass);
  }, [length, numberAllowed, upperCaseAllowed, charAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  // Function to copy password to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 style={{ padding: "20px" }} className="text-4xl mb-6">
        Welcome to Password Generator
      </h1>

      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
        <div className="flex gap-2">
          <input
            type="text"
            value={password}
            readOnly
            className="w-full p-2 text-white font-bold rounded bg-gray-700"
          />
          <button
            onClick={copyToClipboard}
            className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-700"
          >
            Copy
          </button>
        </div>

        <div className="mt-5 flex justify-between gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
            />
            Include Numbers
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={upperCaseAllowed}
              onChange={() => setUpperCaseAllowed((prev) => !prev)}
            />
            Include Uppercase
          </label>
        </div>

        <div className="mt-3 flex justify-center">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            Include Symbols
          </label>
        </div>

        <input
          type="range"
          min="6"
          max="20"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="w-full mt-4"
        />
        <p className="text-gray-300">Length: {length}</p>

        <button
          onClick={passwordGenerator}
          className="bg-blue-500 text-black px-4 py-2 rounded mt-4 hover:bg-blue-700"
        >
          Generate Password
        </button>
      </div>
    </div>
  );
}

export default App;
