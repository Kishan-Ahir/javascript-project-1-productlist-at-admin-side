function saveproduct(event)
{
    event.preventDefault();

    let productname = event.target.productname.value;
    let productprice = event.target.productprice.value;
    let finalprice = document.getElementById("totalvalue");
    finalprice.value = parseInt(finalprice.value) + parseInt(productprice);


    let data = {
        productname,
        productprice
    };

        axios.post("https://crudcrud.com/api/a082f60652a34c828ad0c36656a67723/product_list",data)
        .then((data)=>
        {
            let perentelement = document.getElementById("product-list");
            perentelement.innerHTML = "";
                axios.get("https://crudcrud.com/api/a082f60652a34c828ad0c36656a67723/product_list")
                .then((data)=>
                {
                    for(let i=0;i<data.data.length;i++)
                    {
                        showonscreen(data.data[i]);
                    }
                })
                .catch((err)=>console.log(err));
        })
        .catch((err)=>console.log(err)); 


    function showonscreen(data)
    {
        let perentelement = document.getElementById("product-list");
        let childelement = document.createElement('li');
        childelement.className = "list-group-item";
        let text = document.createTextNode(`Name of product is ${data.productname} and Price of product is ${data.productprice}`);
        childelement.appendChild(text);


        let deletbtn = document.createElement("input");
        deletbtn.type = "button";
        deletbtn.className = "btn btn-danger";
        deletbtn.style = "margin-left: 5px";
        deletbtn.value = "Remove Product"
        deletbtn.onclick = removeproduct;

        function removeproduct(){
            perentelement.removeChild(childelement);
            axios
            .delete(`https://crudcrud.com/api/a082f60652a34c828ad0c36656a67723/product_list/${data._id}`)
            .then(()=>{
                finalprice.value = parseInt(finalprice.value) - parseInt(data.productprice);
            })
            .catch((err)=>{console.log(err)});
        }
        childelement.appendChild(deletbtn);
        perentelement.appendChild(childelement);
    }
}
window.onload = function() {
    let perentelement = document.getElementById("product-list");
    perentelement.innerHTML = "";
    let finalprice = document.getElementById("totalvalue");
    finalprice.value = 0;
  
    axios.get("https://crudcrud.com/api/a082f60652a34c828ad0c36656a67723/product_list")
      .then((data) => {
        for(let i=0;i<data.data.length;i++) {
          showonscreen(data.data[i]);
          finalprice.value = parseInt(finalprice.value) + parseInt(data.data[i].productprice);
        }
      })
      .catch((err) => console.log(err));
  
    function showonscreen(data) {
      let childelement = document.createElement('li');
      childelement.className = "list-group-item";
      let text = document.createTextNode(`Name of product is ${data.productname} and Price of product is ${data.productprice}`);
      childelement.appendChild(text);
  
      let deletbtn = document.createElement("input");
      deletbtn.type = "button";
      deletbtn.className = "btn btn-danger";
      deletbtn.style = "margin-left: 5px";
      deletbtn.value = "Remove Product"
      deletbtn.onclick = removeproduct;
  
      function removeproduct() {
        perentelement.removeChild(childelement);
        axios
          .delete(`https://crudcrud.com/api/a082f60652a34c828ad0c36656a67723/product_list/${data._id}`)
          .then(() => {
            finalprice.value = parseInt(finalprice.value) - parseInt(data.productprice);
          })
          .catch((err) => {console.log(err)});
      }
      childelement.appendChild(deletbtn);
      perentelement.appendChild(childelement);
    }
  };
  