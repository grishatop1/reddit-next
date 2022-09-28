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
    let parent_comments = [];
    let all_comments = Array.from(document.getElementsByClassName("Comment"));
    for (let element of all_comments) {
        let parent = element.parentNode;
        
        if (parent.style.paddingLeft == "16px") {
            parent_comments.push(parent);
        }
    }
    

    let user_y = window.innerHeight / 2 + window.scrollY;
    for (parent of parent_comments) {
        let parent_y = getElementY(parent);
        parent_y += parent.offsetHeight/2
        if (parent_y > user_y) {
            window.scrollTo({
                top: parent_y - window.innerHeight / 2 + 1, behavior: 'smooth'
            });
            break;
        }
    }

});


function getElementY(element) {
    return element.getBoundingClientRect().top + window.scrollY;
}