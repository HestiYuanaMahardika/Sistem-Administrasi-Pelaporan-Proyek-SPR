// Ubah nama file menjadi JavaScript.html

<script>
    // Prevent forms from submitting.
    function preventFormSubmit() {
      var forms = document.querySelectorAll('form');
      for (var i = 0; i < forms.length; i++) {
        forms[i].addEventListener('submit', function(event) {
        event.preventDefault();
        });
      }
    }
    window.addEventListener("load", functionInit, true); 
    
    //INITIALIZE FUNCTIONS ONLOAD
    function functionInit(){  
      preventFormSubmit();
      getLastTenRows();
    };      
    
    //HANDLE FORM SUBMISSION
    function handleFormSubmit(formObject) {
      google.script.run.withSuccessHandler(createTable).processForm(formObject);
      document.getElementById("myForm").reset();
    }
    
    //GET LAST 10 ROWS
    function getLastTenRows (){
     google.script.run.withSuccessHandler(createTable).getLastTenRows();
    }
    
    
    //GET ALL DATA
    function getAllData(){
      //document.getElementById('dataTable').innerHTML = "";
      google.script.run.withSuccessHandler(createTable).getAllData();
    }
    
    
    //CREATE THE DATA TABLE
    function createTable(dataArray) {
      if(dataArray){
        var result = "<table class='table table-sm' rules='all' style='font-size:0.8em; border-collapse: collapse;'>"+
                     "<thead style='white-space: nowrap;'>"+
                       "<tr>"+                               //Change table headings to match witht he Google Sheet
                        "<th scope='col'>Delete</th>"+
                        "<th scope='col'>Edit</th>"+
                        "<th scope='col'>ID</th>"+
                        "<th scope='col'>Nama</th>"+
                        "<th scope='col'>Lokasi</th>"+
                        "<th scope='col'>Status</th>"+
                        "<th scope='col'>No SPR</th>"+
                        "<th scope='col'>No Aset</th>"+
                        "<th scope='col'>Jam Kerusakan</th>"+
                        "<th scope='col'>Tanggal SPR</th>"+
                        "<th scope='col'>Aprov GA</th>"+
                        "<th scope='col'>Deskripsi Kerusakan</th>"+
                        "<th scope='col'>Penyebab Kerusakan</th>"+
                        "<th scope='col'>Site</th>"+
                        "<th scope='col'>Kode Mesin</th>"+
                      "</tr>"+
                    "</thead>";
        for(var i=0; i<dataArray.length; i++) {
            result += "<tr>";
            result += "<td><button type='button' class='btn btn-danger btn-xs deleteBtn' onclick='deleteData(this);'>Delete</button></td>";
            result += "<td><button type='button' class='btn btn-warning btn-xs editBtn' onclick='editData(this);'>Edit</button></td>";
            for(var j=0; j<dataArray[i].length; j++){
                result += "<td>"+dataArray[i][j]+"</td>";
            }
            result += "</tr>";
        }
        result += "</table>";
        var div = document.getElementById('dataTable');
        div.innerHTML = result;
        document.getElementById("message").innerHTML = "";
      }else{
        var div = document.getElementById('dataTable');
        div.innerHTML = "Data not found!";
      }
    }
  
    //DELETE DATA
    function deleteData(el) {
      var result = confirm("Want to delete?");
      if (result) {
        var recordId = el.parentNode.parentNode.cells[2].innerHTML;
        google.script.run.withSuccessHandler(createTable).deleteData(recordId);
      }
    }
    
    
    //EDIT DATA
    function editData(el){
      var recordId = el.parentNode.parentNode.cells[2].innerHTML; //https://stackoverflow.com/a/32377357/2391195
      google.script.run.withSuccessHandler(populateForm).getRecordById(recordId);
    }
  
    //POPULATE FORM
    function populateForm(records){
      document.getElementById('RecId').value = records[0][0];
      document.getElementById('nama').value = records[0][1];
      document.getElementById('lokasi').value = records[0][2];
      document.getElementById(records[0][3]).checked = true;
      document.getElementById('nospr').value = records[0][4];
      document.getElementById('noaset').value = records[0][5];
      document.getElementById('jamkerusakan').value = records[0][6];
      document.getElementById('tglkerusakan').value = records[0][7];
      document.getElementById('ttdga').value = records[0][8];
      document.getElementById('deskripsikerusakan').value = records[0][9];
      document.getElementById('penyebab').value = records[0][10];
      document.getElementById("provinsi").value = records[0][11];
      document.getElementById("kodemesin").value = records[0][12];
      document.getElementById("message").innerHTML = "<div class='alert alert-warning' role='alert'>Update Record [ID: "+records[0][0]+"]</div>";
    }
    
    //RETRIVE DATA FROM GOOGLE SHEET FOR PROVINSI DROPDOWN
    function createProvinsiDropdown() {
        //SUBMIT YOUR DATA RANGE FOR DROPDOWN AS THE PARAMETER
        google.script.run.withSuccessHandler(provinsiDropDown).getDropdownList("Provinsi!A1:A195");
    }
    
    //POPULATE PROVINSI DROPDOWNS
    function provinsiDropDown(values) { //Ref: https://stackoverflow.com/a/53771955/2391195
      var list = document.getElementById('provinsi');   
      for (var i = 0; i < values.length; i++) {
        var option = document.createElement("option");
        option.value = values[i];
        option.text = values[i];
        list.appendChild(option);
      }
    }
  </script>