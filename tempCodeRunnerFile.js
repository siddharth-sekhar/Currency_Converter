let promise = new Promise((resolve,reject)=>{
   console.log("Iam a promise");

   //resolve("Success");
   reject("failed");
});

promise.then(()=>{
  console.log("Promise fulfilled");
});

promise.catch((err)=>{
  console.log("Promise rejected", err);
});