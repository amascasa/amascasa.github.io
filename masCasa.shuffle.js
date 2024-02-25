

window.onload = function(){

  let i, j, numColumns, numFotos, html;
      numColumns = 4;

         for(j = 0; j < numColumns; j++) {
            html += "<div class='img_container'>";
            
               for (let i = 0; i < 10; i++) {
                  
                  let fileNum = Math.floor((Math.random() * 67) + 1);
                  let size = Math.floor((Math.random() * 200) + 1) + 200;

                  html += "<img src='" + fileNum + "MasCasa.jpg'>";
                 
               }

            html += "</div>";

          }

       document.getElementById('pocoFoto').innerHTML = html;
}