class Swipe {

  constructor ( callback = () => {}, target = window ) {

    

    window._SWIPE_INIT = { x: 0, y: 0 };

    window._SWIPE_END = { x: 0, y: 0 };

    

    window._SWIPE_DATA_ = { 

      angle: 0,

      strength: 0,

      direction: false

    };

    

    window._SWIPE_THRESHOLD_ = 25;

    window._SWIPE_DIAGONALS_ENABLED_ = true;

    window._SWIPE_CALLBACK = callback;

   

    this.target = target;

    

    // helper function 

    window._SWIPE_SIMILAR_TO = ( a, target ) => {

      

      if ( a < target + window._SWIPE_THRESHOLD_ && a > target - window._SWIPE_THRESHOLD_ ) return true;

      

      return false;

      

    };

    

  }

  

  listen () {

    

    // Event listeners 

    this.target.addEventListener('touchstart', (e) => {

      

      window._SWIPE_INIT.x = e.touches[0].clientX;

      window._SWIPE_INIT.y = e.touches[0].clientY;

      

    });

    

    this.target.addEventListener('touchmove', (e) => {

      

      window._SWIPE_END.x = e.touches[0].clientX;

      window._SWIPE_END.y = e.touches[0].clientY;

      

    });

    

    this.target.addEventListener('touchend', () => {

      

      requestAnimationFrame(this.end);

      

    });

    

  }

  

  end () {

    

    const dx = window._SWIPE_END.x - window._SWIPE_INIT.x;

    const dy = window._SWIPE_END.y - window._SWIPE_INIT.y;

    

    // calculate distance 

    const d = Math.hypot(dx, dy);

    

    // calculate angle 

    const a = 180 - Math.atan2(dx, dy) * (180 / Math.PI);

    

    window._SWIPE_DATA_.angle = a;

    window._SWIPE_DATA_.strength = d;

    

    // lookup directions 

    switch ( true ) {

      

      case a < 20 || 360 - a < 20:

        

        window._SWIPE_DATA_.direction = 'u';

        window._SWIPE_CALLBACK(window._SWIPE_DATA_);

        return;

      

      case window._SWIPE_SIMILAR_TO(a, 90):

      

        window._SWIPE_DATA_.direction = 'r';

        window._SWIPE_CALLBACK(window._SWIPE_DATA_);

        return;

      

      case window._SWIPE_SIMILAR_TO(a, 180):

     

        window._SWIPE_DATA_.direction = 'd';

        window._SWIPE_CALLBACK(window._SWIPE_DATA_);

        return;

      

      case window._SWIPE_SIMILAR_TO(a, 270):

      

        window._SWIPE_DATA_.direction = 'l';

        window._SWIPE_CALLBACK(window._SWIPE_DATA_);

        return;

      

    }

    

    // lookup diagonal directions 

    switch ( window._SWIPE_DIAGONALS_ENABLED_ ) {

      

      case window._SWIPE_SIMILAR_TO(a, 45):

      

        window._SWIPE_DATA_.direction = 'ur';

        window._SWIPE_CALLBACK(window._SWIPE_DATA_);

        return;

      

      case window._SWIPE_SIMILAR_TO(a, 135):

      

        window._SWIPE_DATA_.direction = 'dr';

        window._SWIPE_CALLBACK(window._SWIPE_DATA_);

        return;

      

      case window._SWIPE_SIMILAR_TO(a, 225):

      

        window._SWIPE_DATA_.direction = 'dl';

        window._SWIPE_CALLBACK(window._SWIPE_DATA_);

        return;

      

      case window._SWIPE_SIMILAR_TO(a, 315):

      

        window._SWIPE_DATA_.direction = 'ul';

        window._SWIPE_CALLBACK(window._SWIPE_DATA_);

        return;

        

    }

    

    window._SWIPE_DATA_.direction = false;

    

  }

  

}

export { Swipe };
