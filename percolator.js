var p;
var density = 0.05;
var type = 2; //'Squares or diamonds - it will alternate between them at the moment
var rate = 5; //Number of squares to draw for each animation frame
var loop = true;
var seed;
var $canv;

//The percolator object - give it any canvas element and it will percolate all over it
var percolator = function(initialdensity,element,type,rate,inseed){

  var width = element.width();
  var height = element.height();
  var square = 3;
  var gap = 1;
  var t = this;
  var nx = Math.round(width/(square+gap));
  var ny = Math.round(height/(square+gap));
  var paused = false;

  this.bgcol = 'rgba(255,255,255,1)';
  this.fgcol = 'rgba(0,0,0,0)';
  this.finished = false;
  this.history = false;
  this.s = [];
  this.donext = loop;
  var ctx = element[0].getContext('2d');

  this.seed = inseed;
  this.dostop = false;
  this.stopcriteria = {};

  //if we dont' specify a seed, generate a new one for this object
  //Initialize the s, the initial condition
  this.initialize = function(){

    while(t.s.length>0){
      t.s.pop();
    }
    t.dostop = false;
    if(!t.stopcriteria.history){
      t.url();
    }
    t.stopcriteria={};
    Math.seedrandom(t.seed);

    console.log('Initialize seed: ' + t.seed);

    for(var ii=0;ii<nx;ii++){
      t.s[ii] = [];
      for(var jj=0;jj<ny;jj++){
        t.s[ii][jj] = Math.random()<initialdensity ? 1 : 0;
      }
    }
    ctx.fillStyle = t.bgcol;
    ctx.fillRect(0,0,width,height);
    t.render();
  };

  this.render = function(){
    arrayloop(function(ii,jj){
      if(t.s[ii][jj] === 1) drawSquare(ii,jj);
    });
  };


  this.update = function(){
    t.running = true;

    if(t.dostop){
      t.stopcbk();
      return;
    }

    var changes = [];

    arrayloop(function(ii,jj){
      var change = updaterule[type](ii,jj,np);
      if(change){
        changes.push([ii,jj]);
      }
    });


    if(changes.length>0){

      var indices = [];
      for(var ll=0; ll<changes.length;ll++){
        indices.push(ll);
      }
      indices = shuffle(indices);

      var c;
      var mm = 0;

      var raf = function(step){

        for(var rateind = 0; rateind< rate; rateind++){
          if(mm < indices.length){
            c = indices[mm];
            drawSquare(changes[c][0],changes[c][1]);
            t.s[changes[c][0]][changes[c][1]] = 1;
            mm++;
          }
        }
        if (mm < indices.length && !t.finished){
          requestAnimationFrame(raf);
        } else {
          t.update();
        }
      };

      requestAnimationFrame(raf);
    } else {
      t.stopcbk({'finished':true});
    }

    };

  this.stop = function(stopobj){
    t.dostop = true;
    t.stopcriteria=stopobj;
    if (!t.running)
      {t.stopcbk();}
  };

  this.stopcbk = function(stopobj){
    t.running = false;
    obj = stopobj || t.stopcriteria;
    if(obj.finished && loop || obj.next){
      //Start again
      Math.seedrandom(seed);
      seed = randomstring(32);
      t.seed = seed;
      t.initialize();
      t.update();
      return;
    }
    if(obj.history){
      //Reset the percolator and start again
      parseURL();
      p.seed = seed;
      p.initialize();
      p.update();
      return;
    }


  };

  this.togglepause = function(){
    if(t.running){
      t.stop();
    } else {
      t.dostop = false;
      t.update();
    }
  };


  //Handle the url for the object
  this.url = function(){
    var res = document.location.href.split('?')[0];
    var state = {seed:t.seed,density:density,type:type,rate:rate,loop:loop};
    history.pushState(state,'Percolation',createURL(res,state));
  };

  //Private methods
  var arrayloop = function(f){
    for(var ii = 0; ii < nx; ii++){
      for(var jj = 0; jj< ny; jj++){
        f(ii,jj);
      }
    }
  };

  var np = function(ii,jj){
    return t.s[(ii+nx)%nx][(jj+ny)%ny];
  };

  var drawSquare = function(ii,jj){
    ctx.clearRect(ii*(square+gap),jj*(square+gap),square,square);
  };

  //Initialize the object!
  this.initialize();
};

function addCanvases(){

  //Sort out the DOM so other things aren't borked
  //var $bg = $('.bg');
  //var w = $bg.width();
  //var h = $bg.height();
  //$bg.css({'background-image':'none'});
  //$bg.children().css({'position':'relative'});
  //var $canv_wrap = $('<div>').attr('id','canv_wrap').css({position:'absolute',float:'left'});
  //$canv = $('<canvas>').attr('id','canvas').attr('width',w).attr('height',h);
  //$canv_wrap.append($canv);
  //$bg.prepend($canv_wrap);
$canv = $('.bg canvas');

}

function parseURL(){

  var urlobj = getUrlVars();
  if(urlobj.density){
    density = urlobj.density;
  }
  if(urlobj.type){
    type = urlobj.type;
  }
  if(urlobj.rate){
    rate = urlobj.rate;
  }
  if(urlobj.loop){
    loop = urlobj.loop ==='true' ;
  } else {
    loop = false;
  }
  if(urlobj.seed){
    seed = urlobj.seed;
  } else {
    seed = randomstring(32);
  }

}


function initpage(){


  addCanvases();
  p = new percolator(density,$canv,type,rate,seed);
  p.update();

//Space to toggle pause
  $(window).keypress(function(e) {
    if (e.keyCode == 32) {
        p.togglepause();
      }
      e.preventDefault();
    });

//Right arrow to go to the next pattern
  $(window).keydown(function(e){
    //This is the right arrow thing
    if (e.keyCode== 39){
      p.stop({'next':true});
    }
  });

  window.onpopstate = function(event){
    p.stop({'history':true});
  };

}



$(function(){
 parseURL();
 initpage();
});

