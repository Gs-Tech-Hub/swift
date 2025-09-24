let products = [{id:'p1',name:'Sneakers',price:7000},{id:'p2',name:'Data 10GB',price:3000}];
export const fetchProducts = async ()=> products;
export const addProduct = async (p)=> { products.unshift({...p,id:Date.now().toString()}); return {success:true}; };
