# W3C validation tool (helper)

## The idea

When working with several pages in a site(s), it might be difficult to see how many errors & warining we have in each page, and which ones appears in more than one page. 
This tool pretend to give a hand on that by sorting those errors.

## Side effect (learning)

This project helped to understand how modules works in js using browserify. 
Also, this helped a lot when fixing w3c errors in several pages.

## Technologies I used: 

- Gulp
- npm and yarn ( I just wanted to see if yarn was faster than npm, and yes it is :P )
- Some ES6 functionallity ( I am getting into it).
- Parsley.js 


I also used some kind of controller (initializer) to run the js modules depending on two factors:

- If the UI element is present (the HTML component to which the module refers to)
- A 'autoLunch' attribute. If set to true, it will run the js module