import { Modal, Form, Input, InputNumber, message,  } from "antd"
import axios from "axios"

const ProductsCreate = ({ openModalCreate, setOpenModalCreate, setProducts }) => {

  const [form] = Form.useForm()

  const createProduct = async () => {
    try {
      const values = await form.validateFields()
      const response = await axios.post("https://fakestoreapi.com/products", values)
      form.resetFields()
      setOpenModalCreate(false)
      setProducts(prev => [...prev, response.data])
      message.success("Se ha creado el producto")
    } catch (error) {
      message.error(error.message || "Error al crear el producto" )
    }
  }
  
  return (
    <div>
      <Modal
        open={openModalCreate}
        title="Nuevo producto"
        onCancel={() => {setOpenModalCreate(false)}}
        onOk={createProduct}
        okText="Crear producto">
          <Form 
            form={form}
            layout="vertical"
            >
              <Form.Item name="title" label="Título">
                <Input />
              </Form.Item>
              <Form.Item name="price" label="Precio">
                <InputNumber />
              </Form.Item>
              <Form.Item name="category" label="Categoría">
                <Input />
              </Form.Item>
              <Form.Item name="image" label="URL de la imágen">
                <Input />
              </Form.Item>
              <Form.Item name="description" label="Descripción">
                <Input.TextArea />
              </Form.Item>
          </Form>

      </Modal>
    </div>
  )
}

export default ProductsCreate