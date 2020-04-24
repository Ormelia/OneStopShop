// const server = 'http://odr'
<script type="text/javascript" src="jquery-3.3.1.js"></script>
// $(document).ready(function{
const url = 'http://localhost:3000/products';
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

// axios.get(url).then(res =>{
//     console.log(res.data);

// });
























// function addForm(){
//     document.getElementById('add_product').style.display = "block";
//     document.getElementById('display_products').style.display = "none";
//     document.getElementById('edit_product').style.display = "none"; 
//     document.forms['add_product'].productCode.value = ""
//     document.forms['add_product'].productDesc.value = ""
//     document.forms['add_product'].productPrice.value = ""
// }

// function editForm(_id){
//     console.log(productCode)
//     axios.get(server + 'products/' + productCode)
//     .then((response)=>{
//         if (response.error != ""){
//             console.log(response.data)
//             document.getElementById('productCode').innerHTML = response.data.data[0].productCode
//             document.forms['edit_product'].productDesc.value = response.data.data[0].productDesc
//             document.forms['edit_product'].productPrice.value = response.data.data[0].productPrice
//             document.getElementById('add_product').style.display = "none";
//             document.getElementById('display_products').style.display = "none";
//             document.getElementById('edit_product').style.display = "block"; 
//         } else {
//             console.log(err)
//         }
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// }

// function displayProducts(){
//     document.getElementById('add_product').style.display = "none";
//     document.getElementById('display_products').style.display = "block";
//     document.getElementById('edit_product').style.display = "none"; 
//     listOfProducts()
// }



// function listOfProducts(){
//     axios.get(server + 'users')
//     .then((response)=>{
//         if (response.error != ""){
//             console.log(response.data)
//             generateUsersTable(response.data)
//         } else {
//             document.getElementById('status').innerHTML = error; 
//             showStatus(0)
//         }
//     })
//     .catch((connectionError)=>{
//         console.log(connectionError)
//         document.getElementById('status').innerHTML = connectionError
//         showStatus(0)
//     })
// }

// function productTable(result){
//     document.getElementById('displayProducts').innerHTML = ''
//     let table = document.createElement('table')
//     row = table.insertRow(0);
//     let productCodeTH = document.createElement('th')
//     productCodeTH.innerHTML = 'Product ID'
//     row.appendChild(productCodeTH);
//     let productDescTH = document.createElement('th')
//     productDescTH.innerHTML = 'Description'
//     row.appendChild(productDescTH);
//     let productPriceTH = document.createElement('th')
//     productPriceTH.innerHTML = 'Price'
//     row.appendChild(productPriceTH);
//     // let productCodeCell = row.insertCell(0).innerHTML = 'id'
//     //     let productDescCell = row.insertCell(1).innerHTML = 'name'
//     //     let productPriceCell = row.insertCell(2).innerHTML = 'email' 
//     for (let i=1; i< result.data.length; i++){
//         let row = table.insertRow(i)
//         let productCodeCell = row.insertCell(0).innerHTML = result.data[i].productCode
//         let productDescCell = row.insertCell(1).innerHTML = result.data[i].productDesc
//         let productPriceCell = row.insertCell(2).innerHTML = result.data[i].productPrice
//         let productEditCell = row.insertCell(3); 
//         let productDeleteCell = row.insertCell(4);
//         let userActivationCell = row.insertCell(5)
//         let editLink = document.createElement('a')
//         editLink.name = 'editLink'
//         editLink.addEventListener('click', ()=>{
//             showEditForm(result.data[i].productCode) // pass the id
//         })
//         editLink.text = 'Edit'
//         editLink.href = '#'
//         productEditCell.appendChild(editLink)

//         let deleteLink = document.createElement('a')
//         deleteLink.name = 'deleteLink'
//         deleteLink.addEventListener('click', ()=>{
//             // deleteEmployee(dataObject[i].employeeID)
//             if (confirm('Confirm Delete?')){
//                 deleteProduct(result.data[i].productCode)
//                 console.log('delete link', result.data[i].productCode)
//             } 
//         })
//         deleteLink.href='#'
//         deleteLink.text = 'Delete'
//         productDeleteCell.appendChild(deleteLink)

//     }
//     document.getElementById('list_products').appendChild(table)
// }

// function deleteProduct(_id){
//     axios.delete(server + 'users/'+ _id)
//     .then((response)=>{
//         if (response.error != ""){
//             console.log(response.data)
//             listOfProducts()
//         } else {
//             console.log(error)
//         }
//     })
//     .catch((err)=>{
//         console.log(err)
//     })
// }

// function updateProduct(){
//     productCode = document.getElementById('productCode').innerHTML
//     productDesc = document.forms['edit_product'].productDesc.value
//     productPrice = document.forms['edit_product'].productPrice.value
//     axios.put(server + 'products/'+ productCode, 
//     {
//         'id': productCode, 
//         'productDesc': productDesc, 
//         'productPrice': productPrice
//     })
//     .then((response)=>{
//         if (response.error != ""){
//             console.log(response.data)
//             listOfProducts()
//         } else {
//             console.log(error)
//         }
//     })
//     .catch((connectionError)=>{
//         console.log(connectionError)
//         document.getElementById('status').innerHTML = connectionError
//         showStatus(0)
//     })
//     return false;
// }

// function addProduct(){
//     productDesc = document.forms['add_product'].productCode.value
//     productPrice = document.forms['add_product'].productDesc.value
//     userActive = document.forms['add_product'].productPrice.value
//     axios.post(server + 'products/', 
//     { 
//         'productDesc': productDesc, 
//         'productPrice': productPrice
//     })
//     .then((response)=>{
//         if (response.error != ""){
//             console.log(response.data)
//             listOfProducts()
//         } else {
//             console.log(error)
//         }
//     })
//     .catch((connectionError)=>{
//         console.log(connectionError)
//     })
//     return false;
// }
// function generateTable(table, data){
//     for(let element of data){
//         let row = table.insertRow();
//         for(key in element) {
//             let cell = row.insertCell();
//             let text = document.createTextNode(element[key]);
//             cell.appendChild(text);
//         }
//     }
// }

// function generateTableHead(table, data){
//     let thead = table.createTHead();
//     let row = thead.insertRow();
//     for(let key of data) {
//         let th = document.createElement("th");
//         let text = document.createTextNode(key);
//         th.appendChild(text);
//         row.appendChild(th);
//     }
// }
// let table = document.querySelector("table");
// let data = Object.keys(array[0]);
// generateTableHead(table, data);
// generateTable(table, array);