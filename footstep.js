
var footstep = {};

footstep.SrcSet = function ( name, leftSrc, rightSrc ) {
  
  this.name  = name;
  this.leftList  = [];
  this.rightList = [];

  var left  = new Audio( leftSrc );
  var right = new Audio( rightSrc );

  this.leftList.push(
    left.cloneNode( true ),
    left.cloneNode( true ),
    left.cloneNode( true )
  );

  this.rightList.push(
    right.cloneNode( true ),
    right.cloneNode( true ),
    right.cloneNode( true )
  );

}

footstep.Sound = function ( srcSets, duration ) {
  
  this.isPlaying = false;
  // this.isActive  = true;
  this.srcSets = srcSets;
  this.duration = duration || 1000;
  this.volume = 1;
  this.currentSrcSet = this.srcSets[ 0 ];
  this._count = 0;

  // var that = this;
  // var onWinFocus = function () { this.isActive = true; };
  // var onWinBlur  = function () { this.isActive = false; };
  // window.addEventListener( 'focus', onWinBlur, false );
  // window.addEventListener( 'blur', onWinBlur, false );

};

footstep.Sound.prototype.play = function ( name ) {
  
  if ( name ) {

    this.change( name );

  }

  if ( this.isPlaying ) {

    return;
    
  }

  this.isPlaying = true;
  this.loop();

};

footstep.Sound.prototype.stop = function () {
  
  this.isPlaying = false;

};

footstep.Sound.prototype.change = function ( name ) {
  
  var srcSet, i, l;

  for ( i = 0, l = this.srcSets.length; i < l; i ++ ) {

    if ( this.srcSets[ i ].name === name ) {

      this.currentSrcSet = this.srcSets[ i ];
      break;

    }

  }
  
};

footstep.Sound.prototype.setDuration = function ( duration ) {

  this.duration = duration;

};

footstep.Sound.prototype.loop = function () {
  
  var that = this;
  this._count = this._count < 2 ? this._count + 1 : 0;

  if ( this.isPlaying ) {

    setTimeout( this.loop.bind( this ), this.duration );

  }

  // that.currentSrcSet.leftList[ that._count ].currentTime = 0;
  that.currentSrcSet.leftList[ that._count ].play();

  setTimeout( function () {

    // that.currentSrcSet.rightList[ that._count ].currentTime = 0;
    that.currentSrcSet.rightList[ that._count ].play();

  }, this.duration / 2 );

};
