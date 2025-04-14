
let productHtml='';
products.forEach((product) =>{
productHtml+=`
<div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars*10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      Shs.${((product.priceCents)*100)}
    </div>

    <div class="product-quantity-container">
      <select>
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${product.id}">
      Add to Cart
    </button>
  </div>
`;
});


document.querySelector('.js-products-grid').innerHTML=productHtml;



function updateCartQuantity(){
  let cartQuantity=0;

  cart.forEach((cartItem) =>{
    cartQuantity+=cartItem.quantity;
  });
  
  document.querySelector('.js-cart-quantity').innerHTML=cartQuantity;
  
}

document.querySelectorAll('.js-add-to-cart-button').forEach((button)=>{
button.addEventListener('click', () => {
const productId=button.dataset.productId;

addToCart(productId);

updateCartQuantity();

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
    Shs${(taxCents)*100}</div>
  </div>

  <div class="payment-summary-row total-row">
    <div>Order total:</div>
    <div class="payment-summary-money">
    $${((totalCents)/100)}</div>
  </div>

  <button class="place-order-button button-primary">
    Place your order
  </button>
`;

document.querySelector('.js-payment-summary').innerHTML=paymentSummaryHTML;


}