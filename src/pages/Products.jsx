import { Row, Col, Typography } from "antd"

const { Title, Text } = Typography

const Products = () => {
  return (
    <>
      <Row gutter={[16,16]}>
        <Col xs={24}>
          <Title>Productos</Title>
        </Col>
      </Row>
    </>
  )
}

export default Products
