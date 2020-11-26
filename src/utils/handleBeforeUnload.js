/**
 * handleBeforeUnload 浏览器页面关闭时的统一事件处理组件
 */

// 需要执行的函数列表
var functionList = undefined;

// 初始化函数列表
const initBeforeUnloadFunctionList = () => {
  functionList = [];
};

// 添加执行函数   
// func:需要执行的函数；
// value：执行函数是需要的数据
const addBeforeUnloadFunction = ( func, value ) => {
  if ( functionList ) {
    if ( typeof func === "function" && typeof value === "object" )
      functionList.append({
        func: func,
        value: value,
      });
    else
      console.error("Parameter Type Error!");
  } else {
    console.error("FunctionList Not Init!");
  }      
};

// 执行所有函数
const carryBeforeUnloadFunction = () => {
  if ( functionList ) {
    window.onbeforeunload = e => {
      functionList.forEach(( item ) => {
        const func = item.func;
        const value = item.value;
        func(value);
      });
      return null;
    };
  } else {
    console.error("FunctionList Not Init!");
  }
};

export {
  initBeforeUnloadFunctionList,
  addBeforeUnloadFunction,
  carryBeforeUnloadFunction
};