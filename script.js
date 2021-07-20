let timerId;
let typeWriters = [];
const panels = document.querySelectorAll('.panel');

panels.forEach((panel) => {
    panel.addEventListener('click', () => {
        removeActiveClasses()
        panel.classList.add('active')
        const children = panel.querySelector('.txt-type');
        if (children){
            // startTypeWriter();
            typeWriters.forEach((typeWriter) => {
                typeWriter.type();
                
            })
            // typeWriter.type();
        }
    })
})

function removeActiveClasses() {
    // console.log(panels);
    panels.forEach(panel => {
        // console.log(panel.classList.length === 2);
        
        if(panel.classList.length === 2) {
            if (typeWriters.length > 0){
                typeWriters.forEach((typeWriter) => {
                    typeWriter.stopTyping();
                    // typeWriter.removeWord();

                })
            }
        }
        
        panel.classList.remove('active')  
    })
}


const TypeWriter = function(txtElement, words, wait = 2500) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);

    //below is the main method of type, that is associated with this typewriter, that does everything
    this.type = function() {
        //current index of word
    const current = this.wordIndex % this.words.length;

    //Get full text of current word
    const fullTxt = this.words[current];

    //Check if deleting
    if(this.isDeleting) {
        //Remove char
        this.txt = fullTxt.substring(0, this.txt.length -1);
    }else {
        //Add char
        this.txt = fullTxt.substring(0, this.txt.length +1);
    }

    //Insert txt into element. the element is span
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    //Initial Type Speed
    let typeSpeed = 200;

    if(this.isDeleting) {
        typeSpeed /=2;
    }


    //if word is complete
    if(!this.isDeleting && this.txt === fullTxt) {
        //make pause at end
        typeSpeed = this.wait;

        //set delete to true
        this.isDeleting = true;

    } else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.wordIndex++;
        //Pause before start type
        typeSpeed = 1000;

    }

    // timerId = setTimeout(() => this.type(), typeSpeed);
    this.timeoutId = setTimeout(() => this.type(), typeSpeed);
    };

    this.isDeleting = false;
    this.timeoutId = 0;
    this.stopTyping = function() {
        if (this.timeoutId){
            clearTimeout(this.timeoutId);
            this.timeoutId = 0;
        }
    }
    // this.txt
    // this.fullTxt = this.words[current];

    // this.removeWord = function() {
    //     if(this.timeoutId === 0){
    //         this.txt = fullTxt.substring(0, this.txt.length -this.txt.length);
    //     }
    // }

}


//init on DOM Load
document.addEventListener('DOMContentLoaded', startTypeWriter);


//Init App
function startTypeWriter(){
    const txtElementArray = document.querySelectorAll('.txt-type');
    let waitTime = 8000;
    
    
    txtElementArray.forEach((txtElement) => {
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');


        // console.log('creating typewriter');
        const tempTypeWriter = new TypeWriter(txtElement, words, waitTime);
        tempTypeWriter.type();
        typeWriters.push(tempTypeWriter);

        waitTime += 1000;

    })


}

function focusText() {
    document.getElementById("focus").focus();
}
