import React from 'react';

function App() {
  const name = "vishwa";
  const car = "tata";
  var b = 5;
  var a = 4;
  var mul = a * b;

  return (
    <div>
      <p>your name is {name}</p>
      <p>you have {car} car </p>
      <h1>{mul}</h1>
    </div>
  );
}

export default App;
