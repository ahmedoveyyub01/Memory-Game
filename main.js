let startGame = document.querySelector(".control-buttons span")
let UserName = document.querySelector(".name span")

startGame.addEventListener("onClick", myFunction())

function myFunction() {
    let yourName = prompt("Whats your name?")
    if (yourName == null || yourName == "") {
        UserName.innerHTML = "Unknown"
    }
    else {
        UserName.innerHTML = yourName
    }

    document.querySelector(".control-buttons").remove()
}

//Effect duration
let duration = 1000

//selecct Blocks Container
let blocksContainer = document.querySelector(".memory-game-blocks")

//Create Array From Game Blocks
let blocks = Array.from(blocksContainer.children)
// console.log(blocks);

// Create Range Of Keys
let orderRange = Array.from(Array(blocks.length).keys())
// console.log(orderRange);
shuffle(orderRange)
// console.log(orderRange);


//Add Order Css Property To Game Blocks
blocks.forEach((block, index) => {
    block.style.order = orderRange[index]

    //Add click event 
    block.addEventListener("click", function () {
        //Trigger the flip block function 
        flipBlock(block)
    })
})




//FLIP Block Function 
function flipBlock(selectedBlock) {

    //Add class is-flipped
    selectedBlock.classList.add("is-flipped")

    //Collect All flipped cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains("is-flipped"))

    if (allFlippedBlocks.length === 2) {


        //stop clicking function
        stopClicking()

        //check matched block function
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1])
    }
}

//stop clicking function
function stopClicking() {
    //Add class no clicking 
    blocksContainer.classList.add("no-clicking")

    setTimeout(() => {
        blocksContainer.classList.remove("no-clicking")

    }, 1000);
}


//check match block
function checkMatchedBlocks(firstBlock, secondBlock) {
    let triesElement = document.querySelector(".tries span")
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove("is-flipped")
        secondBlock.classList.remove("is-flipped")

        firstBlock.classList.add("has-match")
        secondBlock.classList.add("has-match")

        document.getElementById("success").play()
    }
    else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1

        setTimeout(() => {

            firstBlock.classList.remove("is-flipped")
            secondBlock.classList.remove("is-flipped")

        }, duration);
        document.getElementById("fail").play()

    }
}


// Shuffle function
function shuffle(array) {
    // settings vars
    let current = array.length,
        temp,
        random;

    while (current > 0) {
        // Get Random Number
        random = Math.floor(Math.random() * current)

        //Decrease length by one
        current -= 1

        //[1] Save current element in stash
        temp = array[current]

        //[2] current element=random element
        array[current] = array[random]

        array[random] = temp
    }
    return array
}