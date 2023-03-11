// const projectName = 'random-quote-machine';

var currentQuote = '', color = '',
    currentAuthor = '';
const directions = [
    "to right",
    "to left",
    "to top",
    "to bottom",
    "to top left",
    "to top right",
    "to bottom left",
    "to bottom right"
];

fetch('https://random-data-api.com/api/color/random_color')
    .then(response => response.json())
    .then(data => {
        color = data.hex_value;
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];
        document.querySelector("html body").style.background = `linear-gradient(${randomDirection}, ${color}, black)`;
        // console.log(data.color_name);
    })
    .catch(error => {
        console.error(error);
    });


// Set the minimum and maximum border radius values
const minBorderRadius = 0;
const maxBorderRadius = 100;

// Powered by Quotable
// https://github.com/lukePeavey/quotable

document.addEventListener("DOMContentLoaded", () => {
    // DOM elements
    const button = document.querySelector("button");

    function updateQuote() {
        // changeColor();
        // Fetch a random quote from the Quotable API
        fetch("https://api.quotable.io/random")
            .then(response => response.json())
            .then(element => {
                const data = document.getElementById('text');
                data.textContent = element.content;
                currentQuote = element.content;
                const author = document.getElementById('author');
                author.textContent = JSON.stringify(element.author);
                currentAuthor = element.author;
                // Twitter;
                document.querySelector("#tweet-quote").setAttribute(
                    'href',
                    'https://twitter.com/intent/tweet?hashtags=quotes&text=' +
                    encodeURIComponent('"' + currentQuote + '"\n -' + currentAuthor)
                );
                // Whatsapp
                document.querySelector('#whatsapp-quote').setAttribute(
                    'href',
                    'https://wa.me/?text=' +
                    encodeURIComponent('"' + currentQuote + '"\n -' + currentAuthor)
                );

                // Update the quote and author elements with new content
                document.querySelector('#text').textContent = currentQuote;
                document.querySelector('#author').textContent = currentAuthor;

                // Animate the opacity of the quote and author elements
                document.querySelector('.quote-text').animate({ opacity: 0 }, 600, function () {
                    document.querySelector(this).animate({ opacity: 1 }, 400);
                });

                document.querySelector('.quote-author').animate({ opacity: 0 }, 500, function () {
                    document.querySelector(this).animate({ opacity: 1 }, 600);
                });


                // Generate a random border radius value between the minimum and maximum values
                const borderRadius = Math.floor(Math.random() * (maxBorderRadius - minBorderRadius + 1)) + minBorderRadius;

                // Apply the random border radius to the #quote-box element
                document.querySelector('#quote-box').style.borderRadius = borderRadius + 'px';
                // Change the background color and button color
                changeColor();
            });
    }

    function changeColor() {
        fetch('https://random-data-api.com/api/color/random_color')
            .then(response => response.json())
            .then(data => {
                color = data.hex_value;
                // console.log(data.color_name);
            })
            .catch(error => {
                console.error(error);
            });
        // Select a random direction from the array
        const randomDirection = directions[Math.floor(Math.random() * directions.length)];

        // Set the linear gradient background with the random direction
        document.querySelector("html body").style.background = `linear-gradient(${randomDirection}, ${color}, black)`;
    }

    // Attach an event listener to the `button`
    button.addEventListener("click", updateQuote);

    // call updateQuote once when page loads
    updateQuote();
});