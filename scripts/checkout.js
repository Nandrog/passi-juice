

function renderOrderSummary(){

let cartSummaryHTML='';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  for(let i=0;i<products.length;i++){
  const product=products[i];
  if(product.id === productId){
    matchingProduct=product;
  }
  }


cartSummaryHTML+=`
<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
<div class="delivery-date">
  To Be Delivered.
</div>

<div class="cart-item-details-grid">
  <img class="product-image"
    src="${matchingProduct.image}">

  <div class="cart-item-details">
    <div class="product-name">
      ${matchingProduct.name}
    </div>
    <div class="product-price">
      Shs${(matchingProduct.priceCents)*100}
    </div>
    <div class="product-quantity">
      <span>
        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
      </span>
      <span class="update-quantity-link link-primary">
        Update
      </span>
      <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
        Delete
      </span>
    </div>
  </div>
</div>
</div>
`;
  });


  document.querySelector('.js-order-summary').innerHTML=cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((link)=> {
    link.addEventListener('click',()=>{
      
      
      const productId=link.dataset.productId;
      
      removeFromCart(productId);
      
      const container=document.querySelector(`.js-cart-item-container-${productId}`);
    
      container.remove();

      renderPaymentSummary();
      
console.log('hey');
  });
  
});


function renderPaymentSummary(){
  
    let productPriceCents=0;
  
  cart.forEach((cartItem)=>{
    const productId=cartItem.productId;
  
    let matchingProduct;
  
    for(let i=0;i<products.length;i++){
    const product=products[i];
    if(product.id === productId){
      matchingProduct=product;
    }
    }
  
    productPriceCents += matchingProduct.priceCents * cartItem.quantity;
  
  
  });
  
  const totalBeforeTax= productPriceCents;
  
  const taxCents = totalBeforeTax * 0.1;
  const totalCents = totalBeforeTax+taxCents;
  
  const paymentSummaryHTML=`<div class="payment-summary-title">
      Order Summary
    </div>
  
    <div class="payment-summary-row">
      <div>Items (3):</div>
      <div class="payment-summary-money">
      Shs${((productPriceCents)*100)}</div>
    </div>
  
    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
      Shs${((totalBeforeTax)/100)}</div>
    </div>
  
    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
      shs${((taxCents)*100).toFixed(2)}</div>
    </div>
  
    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
      Shs${Math.round((totalCents)*100).toFixed(2)}</div>
    </div>
    <a href="tracking.html"><button class="place-order-button button-primary" >
      Place your order
    </button></a>
  `;
  
  document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;

}
renderPaymentSummary();
}

renderOrderSummary();