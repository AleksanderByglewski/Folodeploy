const styleToJs = require('style-to-js').default;


const css = `
  flex: 1;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-color: #ececec;
  margin: 4px;
  border-radius: 4px;
  background-color: white;
  width:100%;
`;

const jsStyle = styleToJs(css);
console.log(jsStyle);