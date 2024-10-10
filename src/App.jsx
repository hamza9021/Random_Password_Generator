import "./App.css";
import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowd] = useState(false);
  const [password, setPassword] = useState("");
  const passRef = useRef(null);

  const passwordGenetor = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789";
    }
    if (charAllowed) {
      str += "!@#$%^&*(){}";
    }
    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passRef.current.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenetor();
  }, [length, numberAllowed, charAllowed, passwordGenetor]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center bg-gray-900 rounded-lg shadow-lg p-6 transition duration-300 hover:shadow-xl">
        <h1 className="text-4xl font-bold text-white mb-4">
          Strong Password Generator
        </h1>
        <div className="flex w-full mb-4">
          <input
            type="text"
            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300"
            value={password}
            placeholder="password"
            readOnly
            ref={passRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 transform hover:scale-105"
          >
            COPY
          </button>
        </div>
        <div className="flex flex-col items-center mt-4">
          <div className="flex items-center mb-4 w-full">
            <input
              type="range"
              min={8}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full bg-gray-600 rounded-lg appearance-none h-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <label className="text-white ml-2">Length: {length}</label>
          </div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => setNumberAllowed((pre) => !pre)}
              className="mr-2 text-orange-500 focus:ring-orange-500"
            />
            <label htmlFor="numberInput" className="text-white">
              Include Numbers
            </label>
          </div>

          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={() => setCharAllowed((pre) => !pre)}
              className="mr-2 text-orange-500 focus:ring-orange-500"
            />
            <label htmlFor="charInput" className="text-white">
              Include Special Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
