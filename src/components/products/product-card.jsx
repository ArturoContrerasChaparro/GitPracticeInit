import { Card, Image, Typography } from "antd"

const { Title, Text, Paragraph } = Typography

const ProductCard = ({ product }) => {
  return (
    <>
      <Card 
        style={{ textAlign: "center" }}
        title={product.title}
        cover={
          <Image
            alt={product.title}
            src={product.image}
            style={{ width: "100%", maxHeight: 300, objectFit: "contain" }} />
        }
        hoverable>
        <Paragraph ellipsis={{ rows: 2, tooltip: product.description }}>
          {product.description}
        </Paragraph>
        <Title level={3}>{product.price} $</Title>
        <Text type="secondary">{product.category}</Text>

      </Card>
    </>
  )
}

export default ProductCard
