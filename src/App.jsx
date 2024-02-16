import { useState, useCallback, useEffect } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [pass, setPass] = useState("");

  const passwordGenerator = useCallback(() => {
    let res = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (num) str += "0123456789";
    if (char) str += "!@#$%^&*()_+{}[]~`";

    for (let i = 1; i < length; i++) {
      let ind = Math.floor(Math.random() * str.length + 1);
      res += str.charAt(ind);
    }

    setPass(res);
  }, [length, num, char, setPass]);

  useEffect(() => {
    passwordGenerator();
  }, [length, num, char, setPass]);

  return (
    <div className="flex justify-center items-center flex-col gap-10">
      <h1 className=" text-4xl text-center font-mono font-bold text-white mt-5">
        Password Generator
      </h1>
      <div className=" flex justify-center items-center flex-col gap-2  bg-slate-600 w-3/4 p-5 rounded-lg">
        {/* text */}
        <div className=" flex items-center justify-center  w-3/4 p-5 rounded-lg">
          <input
            type="text"
            value={pass}
            placeholder="Password"
            className=" outline-none w-1/2 rounded-full py-1 px-3 cursor-default"
            readOnly
          />

          <button className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 mx-2 rounded-md">
            copy
          </button>
        </div>

        <div className=" flex text-sm gap-5 justify-center items-center bg-slate-300 w-auto rounded-xl h-10 p-10">
          {/* range */}
          <div className=" flex items-center gap-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className=" cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className=" font-semibold text-md">Length: {length}</label>
          </div>
          {/* numbers */}
          <div className=" flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={num}
              id="num"
              onChange={() => {
                setNum((prev) => !prev);
              }}
            />
            <label htmlFor="num" className=" font-semibold text-md">
              Numbers
            </label>
          </div>
          {/* charecter */}
          <div className=" flex item-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={char}
              id="char"
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
            <label htmlFor="char" className=" font-semibold text-md">
              Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
