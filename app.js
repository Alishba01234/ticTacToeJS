let winArr = [
    [0,1,2], [3,4,5], [6,7,8], 
    [0,3,6], [1,4,7], [2,5,8], 
    [0,4,8], [2,4,6]
];

let boxes = document.querySelectorAll(".box");
let newGameBtn = document.querySelector("#newGameBtn");
let res = document.querySelector("#result");
let resetBtn = document.querySelector("#resetBtn");
let divHide = document.querySelector(".hide");
let turnO = true;

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!box.innerText) { // Only allow empty boxes to flip
            box.classList.add("flip"); // Add flip effect
            
            setTimeout(() => {
                box.innerText = turnO ? "O" : "X"; // Show X or O after flip
                if(box.innerText == 'O') box.style.color = "#007AFF";
                else box.style.color = "#FF3B30";
                turnO = !turnO; // Switch turn
                box.disabled = true;
                box.classList.remove("flip"); // Remove class for re-click
                checkWinner();
            }, 500); // Matches CSS animation duration
        }
    });
});

let checkWinner = () => {
    for (let arr of winArr) {
        let pos1 = boxes[arr[0]].innerText;
        let pos2 = boxes[arr[1]].innerText;
        let pos3 = boxes[arr[2]].innerText;

        if ((pos1 && pos2 && pos3) && (pos1 === pos2) && (pos2 === pos3)) {
            res.innerText = `Hurray! Player ${pos1} won the Game`;

            divHide.style.display = "flex";  
            setTimeout(() => {
                divHide.classList.add("showBounce"); 
                divHide.style.top = "0";
            }, 100);

            boxes.forEach((box) => box.disabled = true);
            return;
        }
    }
    
    let allFilled = Array.from(boxes).every(box => box.innerText !== "");
    if (allFilled) {
        res.innerText = `No one won... It's a Draw`;

        divHide.style.display = "flex";  
        setTimeout(() => {
            divHide.classList.add("showBounce");
            divHide.style.top = "0";
        }, 100);
    }
};

newGameBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
    divHide.classList.remove("showBounce"); 
    divHide.style.top = "-100vh";
    setTimeout(() => {
        divHide.style.display = "none"; 
    }, 1500);
});

resetBtn.addEventListener("click", () => {
    boxes.forEach((box) => {
        divHide.classList.add("hide");
        box.disabled = false;
        box.innerText = "";
    });
});