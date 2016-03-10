# compleat-fitness
Compleat Fitness is a website for personal trainer Jenna Freeman. It contains all information on her fitness plans and highly nutritional recipes.

* Only submit just files with extensions .html, .css, .png, .svg, .js, and possibly other formats such as .xcf linked from your report.

* You should also submit a page called report.html containing a report about what you have done. The pages, including report.html, must be valid and immediately readable in a modern browser - please don't slow down marking by making me patch them up to read them.

* The report should list:
    * The aspects of your work that you are proud of.
    * Searches you have done.
    * Things you have found out.
    * Anything that took you a long time.
    * Tools and techniques you have used.
    * Make it clear where you got things from and how much you adapted them. (Images and JS).
    * Descriptions of what drawing/painting techniques you used and how much work you had to do to find out about them.

* Lots of Google searches for almost everything involved with the site. Lots of useful demos found on Stack Overflow and W3 Schools which were taken and adapted for all sorts of features.

## General
* (Beautiful) Nav panel uses only HTML and CSS. This was first taken from http://codepen.io/anon/pen/JXGNGQ however they used FontAwesome for the icons. I have adapted this so it uses custom made SVGs which have all been made in Inkscape except for the cutlery icon: http://www.flaticon.com/free-icon/restaurant-cutlery-circular-symbol-of-a-spoon-and-a-fork-in-a-circle_45332. I have also tidied up the CSS massively and changed the styling and positioning. This took a long time to perfect but looks good now it's done.

* Whole site has fluid design and everything is still readable no matter what size the window is made. Not tested on mobile.

* 'Compleat Fitness' logo and favicon created from scratch using Gimp and royalty-free font 'Pecita'.

* Inclusion of a favicon.

## index.html
* Gimp used to make background image translucent, improving legibility of overlying text.

## packages.html
* Learned to write accordion from http://inspirationalpixels.com/tutorials/creating-an-accordion-with-html-css-jquery. Styled to our needs and work well for FAQs.

* BMI Calculator uses JavaScript to take values from weight and height sliders, calculates BMI, and replaces the innerHTML of a DOM to display result. This happens on each change of sliders thanks to jQuery.

## nutrition.html
* Using Instafeed (https://github.com/stevenschobert/instafeed.js) to pull in pictures from Instagram was not too difficult however I did have to set up an Instagram dev account and register the application. I think this plugin is slightly broken in the respect that I cannot resize the pictures. I am working on the plugin on my own branch on Github to try and get a fix.

* More difficult, managed to get the Instagram pictures in to a nice image slider Slick (https://github.com/kenwheeler/slick/). This now works well and will look nice when the images are larger.

## contact.html
* Contact form elements looked up on W3Schools and styling from different sources searching online to see what could look good on our site.

* Google map instructions taken from the Google Map API intro page.


## References
* Instafeed.js: https://github.com/stevenschobert/instafeed.js
* Slick: https://github.com/kenwheeler/slick/
* Nav bar: http://codepen.io/anon/pen/JXGNGQ
* Accordion: http://inspirationalpixels.com/tutorials/creating-an-accordion-with-html-css-jquery
* Cutlery Icon: http://www.flaticon.com/free-icon/restaurant-cutlery-circular-symbol-of-a-spoon-and-a-fork-in-a-circle_45332
* Background Image: http://www.tiffanylaryn.com/wp-content/uploads/2015/03/fitness.jpg
* Social Media Icons: https://nucleoapp.com/
