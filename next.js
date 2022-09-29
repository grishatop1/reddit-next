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
    moveToNext();
});

//Main function
function moveToNext() {
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
            scrollTo(parent_y - window.innerHeight / 2 + 1, ()=>{
                //flash(parent);
            });
            break;
        }
    }
}

function showBtn() {
    btn.style.display = "block";
}

function hideBtn() {
    btn.style.display = "none";
}


function getPage(){
    browser.tabs.query({currentWindow: true, active: true})
      .then((tabs) => {
        return tabs[0].url;
    })
  }


function flash(element) {
    element.style.transition = "0.1s all";
    element.style.transform = "translateX(10px)";
    setTimeout(()=> {
        element.style.transform = "translateX(-10px)";
        setTimeout(()=> {
            element.style.transform = "";
        }, 50)
    }, 50)
}


function getElementY(element) {
    return element.getBoundingClientRect().top + window.scrollY;
}


/**
 * Native scrollTo with callback
 * @param offset - offset to scroll to
 * @param callback - callback function
 */
 function scrollTo(offset, callback) {
    const fixedOffset = offset.toFixed();
    const onScroll = function () {
            if (window.pageYOffset.toFixed() === fixedOffset) {
                window.removeEventListener('scroll', onScroll)
                callback()
            }
        }

    window.addEventListener('scroll', onScroll)
    onScroll()
    window.scrollTo({
        top: offset,
        behavior: 'smooth'
    })
}