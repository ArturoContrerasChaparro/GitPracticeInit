import { Row, Col, Typography, message, Button } from "antd"
import { useEffect, useState } from "react"
import axios from "axios"
import ProductCard from "./product-card"
import ProductsCreate from "./products-create"

const { Title } = Typography

const ProductsComponent = () => {

  const [products, setProducts] = useState([])
  const [openModalCreate, setOpenModalCreate] = useState(false)
  const [productToEdit, setProductToEdit] = useState(null)

  useEffect(() => {
    const getProducts = async () => {
      try {
      const response = await axios.get("https://fakestoreapi.com/products")
        setProducts(response.data)
      } catch (error) {
        message.error(error.message || "Error al obtener los productos")
      }
      
    }
    getProducts()
  },[])

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`)
      message.success("Se borro el producto")
      setProducts(prev => prev.filter( p => p.id !== id))
    } catch (error) {
      message.error(error.message || "Error al borrar el producto")
    }
  }

  const handleOpenModalCreate = () => {
    setOpenModalCreate(true)
  }

  const handleEditProduct = (product) => {
    setProductToEdit(product)
    setOpenModalCreate(true)
  }


  return (
    <>
      <Row gutter={[16,16]}>
        <Col xs={24} sm={12}>
          <Title>Productos</Title>
        </Col>
        <Col xs={24} sm={12} style={{ textAlign: "end" }}>
          <Button size="large" type="primary"  onClick={handleOpenModalCreate}>Crear Producto</Button>
        </Col>
      </Row>

      {products.length > 0 && (
        <Row gutter={[12,12]}>
          {products.map((product) => (
            <Col key={product.id} xs={24} md={8} lg={6} xl={6} xxl={4}>
              <ProductCard
                product={product}
                deleteProduct={deleteProduct}
                onEdit={() => handleEditProduct(product)} />
            </Col>
          ))}
        </Row>
      )}
      
      <ProductsCreate
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate} 
        setProducts={setProducts}
        productToEdit={productToEdit}
        setProductToEdit={setProductToEdit}/>
    </>
  )
}

export default ProductsComponent
