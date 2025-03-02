
// import { copyTextToClipboard } from '../background/background.js'; // Adjust path as needed

console.log("Content Script Loaded");


const body = document.querySelector('body');
if (body) {
  const div = document.createElement('div');
  div.textContent = "Content Script Injected!";
  div.style.position = "fixed";
  div.style.bottom = "10px";
  div.style.right = "10px";
  div.style.padding = "10px";
  div.style.backgroundColor = "green";
  div.style.color = "black";
  div.style.zIndex = "1000";

  // Add an event listener for the click event
  div.addEventListener('click', function() {
    console.log("Div was clicked!");
    // You can add more actions here, such as alerting the user or changing styles.
  });

  body.appendChild(div);
}

