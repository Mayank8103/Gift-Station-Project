import MaterialTable from "@material-table/core";
import { useEffect, useState } from "react";
import { getData } from "../services/ServerServices";



export default function DisplayProductList(){

    const [products, setProducts] = useState([])
    


    const fetchProductList= async()=>{
        var result= await getData('productlist//fetch_all_productlist')
        setProducts(result.data)

    }

       useEffect( function(){
           
        fetchProductList()
       },[])

    const handleDialoge=()=>{

    }

    const handleCancelDialoge=()=>{

    }

   

    function ShowAllProductList() {
        return (
            <MaterialTable

                title="Display ProductList"
                columns={[
                    
                    { title: 'Category', field: 'category' },
                    { title: 'SubCategory', field: 'subcategory' },
                    { title: 'Product', field: 'product' },
                    { title: 'Weight', field: 'weight' },
                    { title: 'Price', field: 'price' },
                    { title: 'offerPrice', field: 'offerprice' },
                   
                    { title: 'discription', field: 'discription' },
                    // {
                    //     title: 'last updation', field: 'createdby',
                    //     render: rowData =>
                    //         <div>{rowData.createdat}<br />
                    //             {rowData.updatedat}<br />
                    //             {rowData.createdby}</div>
                    // },

                ]}
                data={products}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit User',
                        onClick: (event, rowData) => handleDialoge(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'delete User',
                        onClick: (event, rowData) => handleCancelDialoge(rowData)
                    }
                ]}
            />
        )
    }

    return(
        <div>
         {ShowAllProductList()}
        </div>
    )
}