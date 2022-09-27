let btn = document.createElement("div");

btn.style.position = "fixed";
btn.style.right = "20px";
btn.style.bottom = "20px";
btn.style.zIndex = "9999999999";

let img = document.createElement("img");
img.style.position = "relative";
img.style.height = "42px";
img.style.cursor = "pointer";
img.src = browser.runtime.getURL("icons/arrow.png");

btn.appendChild(img);
document.body.appendChild(btn);

btn.addEventListener("click", () => {
    
});