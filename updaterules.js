
var updaterule = [function(ii,jj,np){
  var change = false;
  if (np(ii,jj) === 0){
    change = np(ii-1,jj-2) & np(ii-1,jj-1) & np(ii-1,jj) & np(ii-1,jj+1) & np(ii-1,jj+2);
    change = change |  np(ii+1,jj-2) & np(ii+1,jj-1) & np(ii+1,jj) & np(ii+1,jj+1) & np(ii+1,jj+2);
    change = change |  np(ii-1,jj-1) & np(ii-1,jj-1) & np(ii,jj-1) & np(ii+1,jj-1) & np(ii-1,jj-1);
    change = change |  np(ii-2,jj+1) & np(ii-1,jj+1) & np(ii,jj+1) & np(ii+1,jj+1) & np(ii+2,jj+1);
  }
  return change;
},
function(ii,jj,np){
  var change = false;
  if (np(ii,jj) === 0){
    change = (np(ii-1,jj) + np(ii+1,jj) + np(ii,jj-1) + np(ii,jj+1)) >= 2;
    //change = np(ii,jj-1) & np(ii+1,jj);
    //change = change | np(ii+1,jj) & np(ii,jj+1);
    //change = change | np(ii,jj+1) & np(ii-1,jj);
    //change = change | np(ii-1,jj) & np(ii,jj-1);
  }
  return change;
},
function(ii,jj,np){
  var change = false;
  if(np(ii,jj)===0){
    change = (np(ii,jj-1) + np(ii+1,jj) + np(ii-1,jj+1)) >=2;
    //change = change | (np(ii,jj+1) + np(ii-1,jj) + np(ii+1,jj-1)) >= 2;
    //change = change | (np(ii-1,jj) + np(ii,jj-1) + np(ii+1,jj+1)) >= 2;
    //change = change | (np(ii-1,jj+1) + np(ii+1,jj)) + np(ii,jj-1) >= 2;
  }
  return change;
},
function(ii,jj,np){
  var change = false;
  if(np(ii,jj)===0){
    change = (np(ii-1,jj) + np(ii,jj-1) + np(ii,jj+1)) >= 2;
  }
  return change;
},
function(ii,jj,np){
  var change = false;
  if(np(ii,jj)===0){
    change = (np(ii-3,jj) + np(ii-2,jj) + np(ii-1,jj)) == 3;
    //change = change | (np(ii,jj-1) + np(ii,jj-2) + np(ii+1,jj-1) + np(ii+1,jj-2)) == 4;
    //change = change | (np(ii,jj-1) + np(ii,jj-2) + np(ii-1,jj-1) + np(ii-1,jj-2)) == 4;
    change = change | (np(ii,jj+1) + np(ii,jj+2) + np(ii+1,jj+1) + np(ii+1,jj+2)) == 4;
    change = change | (np(ii,jj+1) + np(ii,jj+2) + np(ii-1,jj+1) + np(ii-1,jj+2)) == 4;
    //change = change | (np(ii-1,jj) + np(ii-2,jj) + np(ii-1,jj+1) + np(ii-2,jj+1)) == 4;
    //change = change | (np(ii-1,jj) + np(ii-2,jj) + np(ii-1,jj-1) + np(ii-2,jj-1)) == 4;
    //change = change | (np(ii+1,jj) + np(ii+2,jj) + np(ii+1,jj+1) + np(ii+2,jj+1)) == 4;
    //change = change | (np(ii+1,jj) + np(ii+2,jj) + np(ii+1,jj-1) + np(ii+2,jj-1)) == 4;
  }
  return change;
}
];
