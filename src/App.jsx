import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [num, setNum] = useState(false);
  const [char, setChar] = useState(false);
  const [pass, setPass] = useState("");
  const [copy, setCopy] = useState(false);
  // ref hook
  const passwordRef = useRef(null);

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
    setCopy(false);
    passwordGenerator();
  }, [length, num, char]);

  const copyPass = useCallback(() => {
    copy ? setCopy(false) : setCopy(true);
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 30);

    window.navigator.clipboard.writeText(pass);
  }, [pass]);

  return (
    <div className="flex justify-center items-center flex-col gap-10">
      <h1 className=" text-4xl text-center font-mono font-bold text-white mt-5">
        Password Generator
      </h1>
      <div className=" flex  justify-center items-center flex-col gap-5  bg-slate-600 w-3/4 p-5 rounded-lg">
        {/* text */}

        <div className=" flex shadow overflow-hidden items-center justify-center w-1/2 h-10  rounded-full">
          <input
            type="text"
            value={pass}
            placeholder="Password"
            className=" outline-none h-full w-full py-1 px-3 cursor-default"
            readOnly
            ref={passwordRef}
          />

          <button
            onClick={copyPass}
            className="outline-none bg-blue-700 text-white px-4 py-1 shrink-0 h-full w-auto"
          >
            {copy ? "copied" : "copy"}
          </button>
        </div>

        <div className=" flex text-sm gap-5 justify-center items-center bg-slate-300 w-auto rounded-xl h-10 p-10">
          {/* range */}
          <div className=" flex items-center gap-1">
            <input
              type="range"
              min={6}
              max={30}
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
