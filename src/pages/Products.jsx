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

  return (
    <>
      <Row gutter={[16,16]}>
        <Col xs={24}>
          <Title>Productos</Title>
        </Col>
      </Row>

      {products.length > 0 && (
        <Row>
          {products.map((product) => (
            <Col key={product.id} xs={24} md={8} lg={6} xl={4} xxl={3}>
              <ProductCard
                product={product} />
            </Col>
          ))}
        </Row>
      )}
      
    </>
  )
}

export default Products
