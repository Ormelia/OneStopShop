const server = 'http:// serverodr'



//////HTML displays////////////////////////////////////////////
function addForm(){
    document.getElementById('addForm').style.display = "block";
    document.getElementById('displayProducts').style.display = "none";
    document.getElementById('editForm').style.display = "none"; 
    document.forms['addForm'].name.value = ""
    document.forms['addForm'].price.value = ""
}

function editForm(_id){
    console.log(_id)
    axios.get(server + 'products/' + _id)
    .then((response)=>{
        if (response.error != ""){
            console.log(response.data)
            document.getElementById('_id').innerHTML = response.data.data[0]._id
            document.forms['edit_product'].name.value = response.data.data[0].name
            document.forms['edit_product'].price.value = response.data.data[0].price
            document.getElementById('addForm').style.display = "none";
            document.getElementById('displayProducts').style.display = "none";
            document.getElementById('editForm').style.display = "block"; 
        } else {
            console.log(err)
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

function displayProducts(){
    document.getElementById('addForm').style.display = "none";
    document.getElementById('editForm').style.display = "none";
    document.getElementById('displayProducts').style.display = "block"; 
    listProducts()
}
///////////////////////////////////////////////////////

//add a product from POST
function addProduct(){
    name = document.forms['addForm'].name.value
    price = document.forms['addForm'].price.value
    axios.post(server + 'products/', 
    { 
        'name': name, 
        'price': price
    })
    .then((response)=>{
        if (response.error != ""){
            console.log(response.data)
            listProducts()
        } else {
            console.log(error)
        }
    })
    .catch((connectionError)=>{
        console.log(connectionError)
    })
    return false;
}

//edit product from PATCH
function updateProduct(){
    _id = document.getElementById('_id').innerHTML
    name = document.forms['edit_product'].name.value
    price = document.forms['edit_product'].price.value
    axios.patch(server + 'products/'+ _id, 
    {
        'id': _id, 
        'name': name, 
        'price': price
    })
    .then((response)=>{
        if (response.error != ""){
            console.log(response.data)
            displayProducts()
        } else {
            console.log(error)
        }
    })
    .catch((connectionError)=>{
        console.log(connectionError)
    })
    return false;
}



//delete product from DELETE
function deleteProduct(_id){
    axios.delete(server + 'users/'+_id)
    .then((response)=>{
        if (response.error != ""){
            console.log(response.data)
            listProducts()
        } else {
            console.log(error)
        }
    })
    .catch((err)=>{
        console.log(err)
    })
}

//retrieves products from GET
function listProducts(){
    axios.get(server + 'users')
    .then((response)=>{
        if (response.error != ""){
            console.log(response.data)
            productTable(response.data)
        } else {
            console.log(err)
        }
    })
    .catch((connectionError)=>{
        console.log(connectionError)
    })
}

////////generate product table///
function productTable(result){
    document.getElementById('displayProducts').innerHTML = ''
    let table = document.createElement('table')
    row = table.insertRow(0);
    let _idTH = document.createElement('th')
    _idTH.innerHTML = 'Product ID'
    row.appendChild(_idTH);
    let nameTH = document.createElement('th')
    nameTH.innerHTML = 'Name'
    row.appendChild(nameTH);
    let priceTH = document.createElement('th')
    priceTH.innerHTML = 'Price'
    row.appendChild(priceTH);

    for (let i=1; i< result.data.length; i++){
        let row = table.insertRow(i)
        let _idCell = row.insertCell(0).innerHTML = result.data[i]._id
        let nameCell = row.insertCell(1).innerHTML = result.data[i].name
        let priceCell = row.insertCell(2).innerHTML = result.data[i].price
        let productEditCell = row.insertCell(3); 
        let productDeleteCell = row.insertCell(4);

        let editLink = document.createElement('a')
        editLink.name = 'editLink'
        editLink.addEventListener('click', ()=>{
            showEditForm(result.data[i]._id) // pass the id
        })
        editLink.text = 'Edit'
        editLink.href = '#'
        productEditCell.appendChild(editLink)

        let deleteLink = document.createElement('a')
        deleteLink.name = 'deleteLink'
        deleteLink.addEventListener('click', ()=>{
            // deleteEmployee(dataObject[i].employeeID)
            if (confirm('Confirm Delete?')){
                deleteProduct(result.data[i]._id)
                console.log('delete link', result.data[i]._id)
            } 
        })
        deleteLink.href='#'
        deleteLink.text = 'Delete'
        productDeleteCell.appendChild(deleteLink)

    }
    document.getElementById('list_products').appendChild(table)
}