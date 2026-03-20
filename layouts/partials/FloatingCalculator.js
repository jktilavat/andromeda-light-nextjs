import { useState } from "react";
import { FiX, FiPlus, FiMinus, FiDivide } from "react-icons/fi";
import { FaEquals, FaCalculator } from "react-icons/fa";

export default function FloatingCalculator() {
  const [isOpen, setIsOpen] = useState(false);
  const [display, setDisplay] = useState("0");
  //   const [previousValue, setPreviousValue] = useState(null);
  //   const [operation, setOperation] = useState(null);
  new Intl.NumberFormat().format();
  const [expression, setExpression] = useState("");
  const [oprator, setOprator] = useState("");

  //   const handleNumber = (num) => {
  //     setDisplay(display === "0" ? num : display + num);
  //   };

  // const handleNumber = (num) => {
  //  if (expression.includes("=")) {
  //   setDisplay(num);
  //   setExpression(num);
  //   return;
  // } else {
  //     setDisplay(display);
  //     setExpression(expression + num);
  //   }
  // };

  const handleNumber = (num) => {
    // ✅ If "=" exists → start new calculation
    if (expression.includes("=")) {
      setDisplay(num);
      setExpression(num);
      return;
    // }

    // if (display === "0" && num !== ".") {
    //   setDisplay(num);
    //   setExpression(expression + num);
    } else {
      console.log({ display }, { num });
      let result;

      switch (oprator) {
        case "+":
          result = Number(display) + Number(num);
          break;
        case "-":
          result = Number(display) - Number(num);
          break;
        case "*":
          result = Number(display) * Number(num);
          break;
        case "/":
          result = Number(display) / Number(num);
          break;
        default:
          result = Number(num);
      }
      console.log({result}, {oprator}, {num});
      setDisplay(result);
      setExpression(expression + num);
    }
  };

  //   const handleOperation = (op) => {
  //     setPreviousValue(parseFloat(display));
  //     setOperation(op);
  //     setDisplay("0");
  //   };

  // const handleOperation = (op) => {
  //   const operatorSymbol = op === "*" ? "×" : op === "/" ? "÷" : op;

  //   setExpression(expression + " " + op + " ");
  //   setDisplay("0");
  // };

  const handleOperation = (op) => {
    const operatorSymbol = op === "*" ? "×" : op === "/" ? "÷" : op;
    setOprator(op);
    // ✅ If last action was "=" → start from result
    if (expression.includes("=")) {
      setDisplay(display);
      setExpression(display + " " + op + " ");
    } else {
      setExpression(expression + " " + op + " ");
    }

    //   setDisplay("0");
  };

  console.log({ display }, expression);

  //   const handleEqual = () => {
  //     if (previousValue !== null && operation) {
  //       const current = parseFloat(display);
  //       let result = 0;

  //       switch (operation) {
  //         case "+": result = previousValue + current; break;
  //         case "-": result = previousValue - current; break;
  //         case "*": result = previousValue * current; break;
  //         case "/": result = previousValue / current; break;
  //       }

  //       setDisplay(result.toString());
  //       setPreviousValue(null);
  //       setOperation(null);
  //     }
  //   };

  // const handleEqual = () => {
  //   try {
  //     // Replace symbols if needed (safety)
  //     let exp = expression.replace(/×/g, "*").replace(/÷/g, "/");

  //     let result = eval(exp);

  //     const formattedResult = new Intl.NumberFormat("en-IN").format(result);

  //     setDisplay(formattedResult);
  //     setExpression(expression + " =");
  //   } catch (error) {
  //     setDisplay("Error");
  //   }
  // };

  const handleEqual = () => {
    try {
      let exp = expression.replace(/×/g, "*").replace(/÷/g, "/");

      let result = eval(exp);

      const formattedResult = new Intl.NumberFormat("en-IN").format(result);

      setDisplay(formattedResult);
      setExpression(exp + " =");
    } catch {
      setDisplay("Error");
    }
  };

  //   const handleClear = () => {
  //     setDisplay("0");
  //     setPreviousValue(null);
  //     setOperation(null);
  //   };

  const handleClear = () => {
    setDisplay("0");
    setExpression("");
    setOprator("");
  };
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-lg flex items-center justify-center transition-transform duration-300 hover:scale-110 active:scale-90"
      >
        <div
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          {isOpen ? <FiX size={24} /> : <FaCalculator size={24} />}
        </div>
      </button>

      {/* Calculator Panel */}
      <div
        className={`absolute bottom-16 right-0 w-60 sm:w-80 transform transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div className="p-4 shadow-2xl backdrop-blur-sm bg-white/70 rounded-xl border">
          {/* Display */}
          {/* <div className="mb-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <FaCalculator className="text-orange-500" />
              Quick Calculator
            </h3>

            <div className="bg-gray-100 border rounded-lg p-4 text-right">
              <div className="text-2xl font-bold text-orange-500 break-all">
                {display}
              </div>
            </div>
          </div> */}

          <div className="bg-gray-100 border rounded-lg p-4 text-right">
            {/* Expression */}
            <div className="text-sm text-gray-500 break-all">{expression}</div>

            {/* Result */}
            <div className="text-2xl font-bold text-orange-500 break-all">
              {display}
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-2 mt-2">
            <button
              onClick={handleClear}
              className="col-span-2 text-orange-500 font-semibold  floating-calc-btn"
            >
              C
            </button>

            <button onClick={() => handleOperation("/")} className="floating-calc-btn">
              <FiDivide />
            </button>

            <button onClick={() => handleOperation("*")} className="floating-calc-btn">
              ×
            </button>

            {[7, 8, 9].map((n) => (
              <button
                key={n}
                onClick={() => handleNumber(String(n))}
                className="floating-calc-btn"
              >
                {n}
              </button>
            ))}

            <button onClick={() => handleOperation("-")} className="floating-calc-btn">
              <FiMinus />
            </button>

            {[4, 5, 6].map((n) => (
              <button
                key={n}
                onClick={() => handleNumber(String(n))}
                className="floating-calc-btn"
              >
                {n}
              </button>
            ))}

            <button onClick={() => handleOperation("+")} className="floating-calc-btn">
              <FiPlus />
            </button>

            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => handleNumber(String(n))}
                className="floating-calc-btn"
              >
                {n}
              </button>
            ))}

            <button
              onClick={handleEqual}
              className="row-span-2 bg-orange-500 text-white rounded-lg flex items-center justify-center"
            >
              <FaEquals />
            </button>

            <button
              onClick={() => handleNumber("0")}
              className="col-span-2 floating-calc-btn"
            >
              0
            </button>

            <button onClick={() => handleNumber(".")} className="floating-calc-btn">
              .
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
