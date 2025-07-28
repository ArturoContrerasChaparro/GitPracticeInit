import { Row, Col, Typography, message } from "antd"
import { useEffect, useState } from "react"
import axios from "axios"
import ProductCard from "../components/products/product-card"

const { Title } = Typography

const Products = () => {

  const [products, setProducts] = useState([])

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

  return (
    <>
      <Row gutter={[16,16]}>
        <Col xs={24}>
          <Title>Productos</Title>
        </Col>
      </Row>

      {products.length > 0 && (
        <Row gutter={[12,12]}>
          {products.map((product) => (
            <Col key={product.id} xs={24} md={8} lg={6} xl={6} xxl={4}>
              <ProductCard
                product={product}
                deleteProduct={deleteProduct} />
            </Col>
          ))}
        </Row>
      )}
      
    </>
  )
}

export default Products
