function orderPizza(){

return new Promise((resolve,reject)=>{
setTimeout(()=>{
resolve("Pizza Ready 🍕");
},2000);
});

}

orderPizza().then(msg=>console.log(msg));