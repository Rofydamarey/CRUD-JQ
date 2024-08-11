/// <reference types="../@types/jquery" />

var productNameInput=document.getElementById('productName');
var productPriceInput=document.getElementById('productPrice');
var productCategoryInput=document.getElementById('productCategory');
var productDescriptionInput=document.getElementById('productDescription');
var productImageInput=document.getElementById('productImage');
var productImageInput=document.getElementById('productImage');
var deleteBtn=document.getElementById('deleteBtn');
var updateBtn=document.getElementById('updateBtn');
var updateBtn=document.getElementById('btnUpdate');
var btnAdd=document.getElementById('btnAdd');
var searchInput=document.getElementById('searchInput')
var indx=0;
var productList=[];
if (localStorage.getItem('productContainer') !==null) {
    productList= JSON.parse(localStorage.getItem('productContainer'))
displayData();
}


$('#btnAdd').on('click',function addProduct() {
    if (validation(productNameInput) &&
    validation(productPriceInput) &&
    validation(productCategoryInput) &&
    validation(productDescriptionInput)){


        var product={
            name:productNameInput.value,
            price:productPriceInput.value,
            category:productCategoryInput.value,
            description:productDescriptionInput.value,
            image:productImageInput.files[0]?.name ?`images/${productImageInput.files[0]?.name}` :`images/lg.webp`
        }
    productList.push(product)
    localStorage.setItem('productContainer',JSON.stringify(productList))
    displayData()
    clearForm()
    console.log(productList);

    }
    
})


//rf3 el data
function setFormUpdate(indexelement) {
    productNameInput.value=productList[indexelement].name
    productPriceInput.value=productList[indexelement].price
    productCategoryInput.value=productList[indexelement].category
    productDescriptionInput.value=productList[indexelement].description

    btnAdd.classList.add('d-none')
updateBtn.classList.remove('d-none')
index=indexelement
}
//change on data
function updateData() {
    var product={
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        description:productDescriptionInput.value,
        image:"images/android.jpg" 
    }
productList.splice(indx,1,product)
displayData()
localStorage.setItem('productContainer',JSON.stringify(productList))

clearForm()
}

function deleteItem(index) {
    productList.splice(index,1)
localStorage.setItem('productContainer',JSON.stringify(productList))
displayData()
   
}

//display&search
function displayData() {
    var term=searchInput.value;
    var cartona='';
    for (let i = 0; i < productList.length; i++) {
 if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
    cartona +=`
    <tr>
 <td>${[i]}</td>
 <td>${productList[i].name}</td>
 <td>${productList[i].price}</td>
 <td>${productList[i].category}</td>
 <td>${productList[i].description}</td>
 <td>
<img width='100px' src="${productList[i].image}" alt="product">
 
 </td>
 <td>
     <button onclick="setFormUpdate(${[i]})" id='updateBtn' class="btn btn-outline-warning">Update</button>
     <button onclick="deleteItem(${[i]})" id='deleteBtn' class="btn btn-outline-danger">Delete</button>
 </td>


</tr>
`
 }
        
    }
    document.getElementById('table').innerHTML=cartona;
}


function validation(element) {
    var text=element.value
    var regex={
        productName: /^[A-Z][a-z0-9]{2,8}$/i,
        productPrice: /^(\d*. \d{2}|\d+)$/,
        productCategory: /^[A-Z][a-z0-9]{1,11}$/i,
        productDescription: /^[A-Z][a-z0-9]{2,10}$/i
    }
    if(regex[element.id].test(text)==true){
        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
        return true;
    }else
    element.classList.add('is-invalid')
    element.classList.remove('is-valid')
}

//clear 
function clearForm() {
    productNameInput.value=null
    productPriceInput.value=null
    productCategoryInput.value=null
    productDescriptionInput.value=null
    productImageInput.value=null
}