import { useState } from 'react';
import './App.css'
import { ProductsParams } from './types/types';
import { Button, Form } from 'react-bootstrap';
import { shops,categories  } from './data/data';
import { nanoid } from 'nanoid'
import TableComponent from './components/TableComponent';


function App() {
  const [products, setProducts] = useState<ProductsParams[]>([]);
  const [productName, setProductName] = useState<string>("")
  const [productShop, setProductShop] = useState<string>("")
  const [productCategory, setProductCategory] = useState<string>("")
  const [filteredName,setFilteredName] = useState("")
  const [filteredShop,setFilteredShop] = useState("")
  const [filteredCategory,setFilteredCategory] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "bought" |"not-bought">("all");


  const handleAddProduct = () => {
    if(productName === "" || productShop === "" || productCategory === ""){
      alert ("Lütfen bütün alanları doldurunuz!")
      return
    }

    const newProduct: ProductsParams ={
      id: nanoid(),
      name: productName,
      shop: productShop,
      category: productCategory,
      isBought: false
    };
    setProducts([...products, newProduct]);
    setProductName("")
    setProductShop("")
    setProductCategory("")
  };

  const handleToggleBought = (productId: string) => {
    const updatedProducts = products.map((product) => (
      product.id === productId ? {...product, isBought: !product.isBought} : product
    ));
    setProducts(updatedProducts);
  };

  const handleDeleteProduct = (productId: string) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(filteredName.toLowerCase());
    const shopMatch = product.shop === filteredShop || filteredShop === ""
    const categoryMatch = product.category === filteredCategory || filteredCategory === ""
    const statusMatch = filterStatus === "all" || (filterStatus === "bought" && product.isBought) || (filterStatus === "not-bought" && !product.isBought);

    return nameMatch && shopMatch && categoryMatch && statusMatch;
  });

  return (
    <div className='container'>
      <div className='forms-container'>
        <div className='form-section'>
          <h2>Add New Product</h2>
          <Form>
            <Form.Group controlId="productName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control 
                value={productName} 
                onChange={(e) => setProductName(e.target.value)} 
                type="text" 
                placeholder="Enter a product name" 
              />
            </Form.Group>
            <Form.Group  controlId="productShop">
              <Form.Label>Shop</Form.Label>
              <Form.Control as="select" value={productShop} onChange={(e) => setProductShop(e.target.value)}
              >
                <option>Select Shop</option>
                <option value="">All Shops</option>
                {shops.map((shop) => (
                  <option key={shop.id} value={shop.name}>{shop.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group  controlId="productCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" value={productCategory} onChange={(e) => setProductCategory(e.target.value)}
              >
                <option>Select Category</option>
                {categories.map((Category) => (
                  <option key={Category.id} value={Category.name}>{Category.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant='secondary' className="w-100" onClick={handleAddProduct}>
              Add Product
            </Button>
          </Form>
        </div>

        <div className='form-section'>
          <h2>Filter Products</h2>
          <Form>
            <Form.Group  controlId="filteredName">
              <Form.Label>Filter by Name </Form.Label>
              <Form.Control value={filteredName} onChange={(e) => setFilteredName(e.target.value)} type="text" placeholder="Enter a product name" />
            </Form.Group>
            <Form.Group  controlId="filteredShop">
              <Form.Label>Filter by Shop</Form.Label>
              <Form.Control as="select" value={filteredShop} onChange={(e) => setFilteredShop(e.target.value)}
              >
                <option>Select Shop</option>
                {shops.map((shop) => (
                  <option key={shop.id} value={shop.name}>{shop.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group  controlId="filteredCategory">
              <Form.Label>Filter by Category</Form.Label>
              <Form.Control as="select" value={filteredCategory} onChange={(e) => setFilteredCategory(e.target.value)}
              >
                <option>Select Category</option>
                <option value="">All Categories</option>
                {categories.map((Category) => (
                  <option key={Category.id} value={Category.name}>{Category.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <div className='radio-group'>
              <Form.Check 
                type='radio' 
                label="All" 
                name="statusFilter" 
                value="all" 
                checked={filterStatus === "all"} 
                onChange={() => setFilterStatus("all")}
              />
              <Form.Check type='radio' label="Bought" name="statusFilter"  value="bought" checked={filterStatus === "bought"} onChange={() => setFilterStatus("bought")}/>
              <Form.Check type='radio' label="Not Bought" name="statusFilter"  value="not-bought" checked={filterStatus === "not-bought"} onChange={() => setFilterStatus("not-bought")}/>
            </div>
          </Form>
        </div>
      </div>

      <div className='table-container'>
        <TableComponent 
          products={filteredProducts} 
          onDeleteProduct={handleDeleteProduct} 
          onToggleBought={handleToggleBought}
        />
      </div>
    </div>
  )
}

export default App
