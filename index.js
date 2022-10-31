import {menuArray} from "/data";
let list = [];

document.addEventListener("click", (e) => {
    
    if(e.target.dataset.add){
        handleAdd(e.target.dataset.add)
    } else if (e.target.dataset.remove) {
        handleRemove(e.target.dataset.remove)
    } else if (e.target.id ==="order-btn") {
        handleOrder();
    }
})

document.getElementById("pay").addEventListener("click", handlePay)


function handleAdd(menuId) {
    const addedObj = menuArray.filter((item) => {
        return item.id === menuId
    })[0]
    list.push(addedObj);
    document.getElementById("thanks").classList.handleAdd("hide");
    render();
    
}

function handleRemove(menuId) {
    list.splice(menuId -1, 1);
    render();
}

function handleOrder() {
    document.getElementById("payment").classList.remove("hide");
    document.getElementById("list").classList.add('hide');
    list.splice(0)
    console.log(list)
}

function handlePay(e) {
    e.preventDefault();
    document.getElementById("payment").classList.add("hide");
    document.getElementById("thanks").classList.remove("hide");
    document.getElementById("processing").classList.remove("hide");
    
    document.getElementById("customer").innerText = document.getElementById("name").value
    
    setTimeout(() => {
        document.getElementById("processing").classList.add("hide");
        document.getElementById("appreciation").classList.remove("hide");
    },3500)
}

function render() {
    let feed = "";
    let order = "";
    let total = 0;
    let id = 0;
    
    for(let menu of menuArray) {
        
        feed += `
            <div class="section">
            <span class="item">${menu.emoji}</span>
            <div class="item-details">
                <h3>${menu.name}</h3>
                <small>${menu.ingredients}</small>
                <p>$${menu.price}</p>
            </div>
            <button class="add-btn" data-add="${menu.id}">+</button>
        </div>`
    }
    
    for(let item of list) {
        
        order += `
        <div class="order-item">
            <div class="order-name">
                <h3>${item.name}</h3>
                <small class="remove" data-remove=${id += 1}>remove</small>
            </div>
            <p>$${item.price}</p>
        </div>`
        
        total+= item.price
    }
    
    if(list.length === 0) {
        document.getElementById("list").classList.add('hide')
    } else {
        document.getElementById("list").classList.remove('hide')
    }
   
   document.getElementById('root').innerHTML = feed;
   document.getElementById('order').innerHTML = order;
   document.getElementById("total").innerText = "$"+total;
   document.getElementById("pay-amount").innerText = "$"+total;
   
   
}

render()