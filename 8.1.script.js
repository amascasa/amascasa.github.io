



    function loadDoc() {
      const xhttp = new XMLHttpRequest();
      xhttp.onload = function () {
        myFunction(this);
      }
      xhttp.open("GET", "cd_catalog.xml");
      xhttp.send();
    }
    function myFunction(xml) {
      const xmlDoc = xml.responseXML;
      const x = xmlDoc.getElementsByTagName("CD");
      let table = "<tr><th>Artist</th><th>Title</th></tr>";
      for (let i = 0; i < x.length; i++) {
        table += "<tr><td>" +
          x[i].getElementsByTagName("ARTIST")[0].childNodes[0].nodeValue +
          "</td><td>" +
          x[i].getElementsByTagName("TITLE")[0].childNodes[0].nodeValue +
          "</td></tr>";
      }
      document.getElementById("demo").innerHTML = table;
    }



    function tableTest() {

      let html = "<table>";
      let rows = 10;

      for (let i = 0; i < rows; i++) {
        html += "<tr><td>stuff</td><td>moreStuff</td></tr>";
      }

      html += "</table>";

      document.getElementById("stuff").innerHTML = html;

    }
