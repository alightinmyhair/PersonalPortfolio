const panels = document.querySelectorAll('.panel')

panels.forEach((panel) => {
    panel.addEventListener('click', () => {
        removeActiveClasses()
        panel.classList.add('active')
    })
})

function removeActiveClasses() {
    panels.forEach(panel => {
        panel.classList.remove('active')
    })
}

const TypeWriter = function(txtElement, words, wait = 5000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    //below is the main method of type, that is associated with this typewriter, that does everything
    this.type();
    this.isDeleting = false;
}

//Type Method
//we need to use prototype to add a method to our TypeWriter
TypeWriter.prototype.type = function() {
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

    setTimeout(() => this.type(), typeSpeed);
}


//init on DOM Load
document.addEventListener('DOMContentLoaded', init);

//Init App
function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    //Init Typewriter
    new TypeWriter(txtElement, words, wait);
}