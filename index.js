"use strict";

// hamburger menu
const navList = document.getElementById("nav-list");
const hamburgerIcon = document.querySelector(".hamburger-icon");

hamburgerIcon.addEventListener("click", () => {
  navList.classList.toggle("show-menu");
})

// API request
const shortenBtn = document.getElementById("shorten-btn");
const linkInput = document.getElementById("input-url");
const results = document.querySelector(".result-container");
const error = document.querySelector(".error");
const initialLink = document.querySelector(".original-link");
const shortLink = document.querySelector(".short-link");
const validURL = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g;

shortenBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const originalLink = linkInput.value;
  
  console.log(originalLink)

  const apiURL = `https://api.shrtco.de/v2/shorten?url=${originalLink}`
  
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    console.log(data);
    
    if (!(validURL.test(originalLink))) {
      error.classList.add("show");
      linkInput.classList.add("show");
    } else {
      error.style.display = "none";
      results.style.display = "inline-block";
      initialLink.textContent = originalLink;
      shortLink.textContent = data.result.full_short_link;
    }
  } catch (e) {
    console.error(e);
  }
})

/* COPY TO CLIPBOARD */
const copyButton = document.getElementById("copy-button");

copyButton.addEventListener("click", async () => { 
  copyButton.style.backgroundColor = "var(--dark-violet)";
  copyButton.innerText = "Copied!";
  let text = shortLink.innerHTML;
  console.log(text)
  try {
    await navigator.clipboard.writeText(text);
    console.log("Content copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy", err);
  }
});