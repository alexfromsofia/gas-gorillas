function init() {
  return (function () {
    let isWalletConnected = false;
    const btnDecrement = document.getElementById("btn-decrement");
    const btnIncrement = document.getElementById("btn-increment");
    const bubbleContainer = document.querySelector(".bubble-container");
    const mainContainer = document.querySelector(".gorilla-mint-container");
    const priceElement = document.querySelector(".price");
    const countInput = document.getElementById("count-input");
    const form = document.getElementById("form");
    const btnWalletConnect = document.getElementById("connect-wallet");

    const mintCost = 0.06;
    const maxValue = 10;
    const minValue = 1;
    const bubble =
      '<div class="bubble"><img loading="lazy" src="./gorillas.gif"></div>';

    function handleAdjustBubbleContainer(itemsCount) {
      const containerWidth = bubbleContainer.getBoundingClientRect().width;
      const columnWidth = Math.min(110, (containerWidth * 0.1) / itemsCount);
      bubbleContainer.setAttribute(
        "style",
        `grid-auto-columns: ${columnWidth}px; margin-left: -110px;`
      );
    }

    function handleIncrement() {
      const { value } = countInput;
      const numVal = Number(value);

      if (numVal === maxValue) {
        return;
      }

      countInput.stepUp();
      calculatePrice(numVal + 1);
      bubbleContainer.insertAdjacentHTML("beforeend", bubble);
      handleAdjustBubbleContainer(numVal);
    }

    function handleDecrement() {
      const { value } = countInput;
      const numVal = Number(value);

      if (numVal === minValue) {
        return;
      }

      countInput.stepDown();

      calculatePrice(numVal - 1);
      bubbleContainer.childNodes[
        bubbleContainer.childNodes.length - 1
      ].remove();
      handleAdjustBubbleContainer(numVal);
    }
    function calculatePrice(count) {
      priceElement.innerHTML = `${count} x ${mintCost} = ${
        count * mintCost
      } ETH`;
    }

    function handleFormSubmit(event) {
      event.preventDefault();
    }

    function handleWalletConnect(event) {
      event.preventDefault();

      isWalletConnected = true;
      btnWalletConnect.classList.add("hidden");
      mainContainer.classList.remove("hidden");
      mainContainer.classList.add("visible");
    }

    btnIncrement.addEventListener("click", handleIncrement);
    btnDecrement.addEventListener("click", handleDecrement);
    btnWalletConnect.addEventListener("click", handleWalletConnect);
    form.addEventListener("submit", handleFormSubmit);
  })();
}

document.addEventListener("DOMContentLoaded", init, false);
