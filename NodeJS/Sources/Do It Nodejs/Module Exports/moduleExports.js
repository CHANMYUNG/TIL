var calc={};
calc.add = function(left, right){
  console.log(left+right+' in moduleExports');
}
module.exports = calc;
