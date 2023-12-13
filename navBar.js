function navBar() {

  let html, topics, number, part, i, j;
  
  html = "<nav id='drop'>" +
           "<ul class='navbar'>" +
             "<li><a href='index.html'>Home</a></li>";
  
  topics = ['Basics', 'Functions', 'Loops', 'Arrays',
            'Objects', 'Cookies', 'Ajax'];
  number = ['2.', '3.', '4.', '5.', '6.', '7.', '8.'];
  part   = ['I', 'II', 'III'];   
  
  
  
  for(i = 0; i < topics.length; ++i) {
  
    html += "<li><a href=" + number[i]  + "0.html>" + topics[i] + "</a><ul>";
  
      for (j = 0; j < part.length; ++j) {
   
        html += "<li><a href=" + number[i] + (j+1) + ".html>Part " + part[j] +  "</a></li>"
      }
  
      html += "</ul>";
  
     }

  html += "</li></ul></nav>";
  
  
  document.getElementById('navBar').innerHTML = html;
  
  }
  