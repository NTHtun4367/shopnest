import type { ProductFormInputs } from "@/schema/product";
import ProductForm from "./ProductForm";

function CreateProduct() {
  const onSubmit = async (data: ProductFormInputs) => {};
  const isLoading = false;

  return <ProductForm onSubmit={onSubmit} isLoading={isLoading} />;
}

export default CreateProduct;
