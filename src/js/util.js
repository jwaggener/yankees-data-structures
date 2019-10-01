export function memo(arr){
  let args = [{}];
  if(arr.length === undefined){
    args.push(arr);
  }else{
    for(var i = 0; i<arr.length; i++){
      args.push(arr[i])
    }
  }
  return Object.assign.apply({}, args);
}
