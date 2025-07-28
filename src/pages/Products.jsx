import { Row, Col, Typography, message, Card, Image } from "antd"
import { useEffect, useState } from "react"
import axios from "axios"

const { Title, Text } = Typography

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
            <Col xs={24} md={8} lg={6} xl={4} xxl={3} style={{ textAlign: "center" }}>
              <Card 
                key={product.id}
                title={product.title}
                cover={
                  <Image
                    alt={product.title}
                    src={product.image}
                    style={{ width: "100%", maxHeight: 300, objectFit: "contain" }}/>
                }
                hoverable>
                  <div> 
                    <Text ellipsis={{ tooltip: product.description }}>{product.description}</Text>
                  </div>
                  <div>
                    <Title level={3}>{product.price} $</Title>
                  </div>
                  <div>
                    <Title level={5}>{product.category}</Title>
                  </div>
                
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default Products
