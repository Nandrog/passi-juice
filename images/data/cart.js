let cart=JSON.parse(localStorage.getItem('cart'));

if(!cart){
  cart=[];}
    
function saveToStorage(){
  localStorage.setItem('cart',JSON.stringify(cart));
}


function addToCart(productId){
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId===cartItem.productId){
      matchingItem=cartItem;
    }
  });
  
  if(matchingItem){
    matchingItem.quantity+=1
  }else{
  cart.push({
    productId,
    quantity:1,
    deliveryOptionId:'1 '
  });
  }

  saveToStorage();
}




function removeFromCart(productId){
const newCart=[];

cart.forEach((cartItem)=>{
  if(cartItem.productId !==productId){
    newCart.push(cartItem);
  }
});

cart = newCart;

saveToStorage();
}

function removeCart(){
  const newCart=[];
  
  cart = newCart;
  
  saveToStorage();
  }
