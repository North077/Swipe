# Swipe
Introducing a powerful and intuitive JavaScript library that allows you to effortlessly add a swipe listener to your web game or application. This library is well suited for casual games but it can also be used in many different types of applications. The API is designed to be as easy as possible to integrate into your web application.
## How to use
```javascript
// import swipe 
import { Swipe } from './Swipe.js';

// create a new swipe listener 
const swipe = new Swipe((data) => {
  // data is a object with three properties, strength, angle and direction. 
  // direction can be (u, d, l, r, ul, dl, ur, dr)
  console.log(data);

});
// Active swipe. (The function passed as parameter is called)
swipe.listen();
```

