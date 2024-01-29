function navBar() {

  let html, topics, number, part, i, j;
  
  html = "<nav id='drop'>" +
           "<ul class='navbar'>" +
             "<li><a href='index.html'>Home</a></li>";
  
  topics = ['home', 'Views', 'Materials', 'Cost'];
  
  
  
  
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
  
  
