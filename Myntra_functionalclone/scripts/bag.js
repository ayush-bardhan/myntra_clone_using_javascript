let bagItems = [];

onLoad();

function onLoad() {
  let bagItemsStr = localStorage.getItem("bagItems");

  if (bagItemsStr) {
    bagItems = JSON.parse(bagItemsStr);
  }

  displayBagItems();
  displayBagIcon();
  displayBagSummary();
}



function displayBagItems() {
  let bagItemsContainerElement = document.querySelector(".bag-items-container");

  if (!bagItemsContainerElement) {
    return;
  }

  let innerHTML = "";

  bagItems.forEach((itemId) => {
    let item = items.find((item) => item.id == itemId);

    // If product does not exist,
    // don't display anything.
    if (!item) {
      return;
    }

    innerHTML += generateItemHTML(item);
  });

  bagItemsContainerElement.innerHTML = innerHTML;
}


function generateItemHTML(item) {
  return `
        <div class="bag-item-container">

            <div class="item-left-part">

                <img
                    class="bag-item-img"
                    src="../${item.image}"
                    alt="${item.item_name}">

            </div>


            <div class="item-right-part">

                <div class="company">
                    ${item.company}
                </div>

                <div class="item-name">
                    ${item.item_name}
                </div>


                <div class="price-container">

                    <span class="current-price">
                        Rs ${item.current_price}
                    </span>

                    <span class="original-price">
                        Rs ${item.original_price}
                    </span>

                    <span class="discount-percentage">
                        (${item.discount_percentage}% OFF)
                    </span>

                </div>


                <div class="return-period">

                    <span class="return-period-days">
                        ${item.return_period || 14} days
                    </span>

                    return available

                </div>


                <div class="delivery-details">

                    Delivery by
                    <span class="delivery-details-days">
                        ${item.delivery_date || "10 Oct 2026"}
                    </span>

                </div>


                <div class="remove-from-cart">

                    <button
                        onclick="removeFromBag('${item.id}')">

                        Remove

                    </button>

                </div>

            </div>

        </div>
    `;
}



function removeFromBag(itemId) {
  let newBagItems = [];

  for (let i = 0; i < bagItems.length; i++) {
    if (bagItems[i] != itemId) {
      newBagItems.push(bagItems[i]);
    }
  }

  bagItems = newBagItems;

  localStorage.setItem("bagItems", JSON.stringify(bagItems));

  displayBagItems();
  displayBagIcon();
  displayBagSummary();
}


function displayBagIcon() {
  let bagItemCountElement = document.querySelector(".bag-item-count");

  if (!bagItemCountElement) {
    return;
  }

  if (bagItems.length > 0) {
    bagItemCountElement.innerText = bagItems.length;

    bagItemCountElement.style.visibility = "visible";
  } else {
    bagItemCountElement.innerText = 0;

    bagItemCountElement.style.visibility = "hidden";
  }
}


function displayBagSummary() {
  let bagSummaryElement = document.querySelector(".bag-summary");

  if (!bagSummaryElement) {
    return;
  }

  let totalItems = bagItems.length;

  let totalMRP = 0;

  let totalDiscount = 0;

  bagItems.forEach((itemId) => {
    let item = items.find((item) => item.id == itemId);

    if (!item) {
      return;
    }

    totalMRP += item.original_price;

    totalDiscount += item.original_price - item.current_price;
  });

  let finalAmount = totalMRP - totalDiscount;

  bagSummaryElement.innerHTML = `

        <div class="bag-details-container">

            <h3>PRICE DETAILS</h3>


            <div class="price-detail">

                <span>
                    Total MRP
                </span>

                <span>
                    Rs ${totalMRP}
                </span>

            </div>


            <div class="price-detail">

                <span>
                    Discount on MRP
                </span>

                <span class="discount">
                    - Rs ${totalDiscount}
                </span>

            </div>


            <div class="price-detail">

                <span>
                    Convenience Fee
                </span>

                <span>
                    Rs 0
                </span>

            </div>


            <hr>


            <div class="price-detail total-amount">

                <span>
                    Total Amount
                </span>

                <span>
                    Rs ${finalAmount}
                </span>

            </div>


            <button class="btn-place-order">

                PLACE ORDER

            </button>

        </div>

    `;
}
