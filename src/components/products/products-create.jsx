import { Modal, Form, Input, InputNumber, message,  } from "antd"
import axios from "axios"
import { useEffect } from "react"

const ProductsCreate = ({ openModalCreate, setOpenModalCreate, setProducts, productToEdit, setProductToEdit }) => {

  const [form] = Form.useForm()

  useEffect(() => {
    if (productToEdit) {
      form.setFieldsValue(productToEdit)
    } else {
      form.resetFields()
    }
  },[productToEdit, form])

  console.log(productToEdit);
  

  const createProduct = async () => {
    try {
      const values = await form.validateFields()

      if (productToEdit) {
        await axios.put(`https://fakestoreapi.com/products/${productToEdit.id}`, values)
        setProducts((prev) =>
          Array.isArray(prev)
            ? prev.map((p) =>
                p.id === productToEdit.id ? { ...p, ...values } : p
              )
            : []
        )
        message.success("Producto actualizado")
      } else {
      const response = await axios.post("https://fakestoreapi.com/products", values)
      setProducts(prev => [...prev, response.data])
      message.success("Se ha creado el producto")
      }
      form.resetFields()
      setOpenModalCreate(false)
      setProductToEdit(null)
    } catch (error) {
      message.error(error.message || "Error al guardar el producto" )
    }
  }
  
  return (
    <div>
      <Modal
        open={openModalCreate}
        title={productToEdit ? "Editar Producto" : "Nuevo producto"}
        onCancel={() => {setOpenModalCreate(false)}}
        onOk={createProduct}
        okText= {productToEdit ? "Actualizar" : "Crear producto"}>
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