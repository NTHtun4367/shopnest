import type { ProductFormInputs } from "@/schema/product";
import ProductForm from "../../components/admin/ProductForm";
import { useCreateProductMutation } from "@/store/slices/productApi";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function CreateProduct() {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: ProductFormInputs) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", String(data.price));
      formData.append("instock_count", String(data.instock_count));
      formData.append("category", data.category);
      formData.append("is_feature", String(data.is_feature));
      formData.append("is_new_arrival", String(data.is_new_arrival));
      formData.append("rating_count", String(data.rating_count));

      // arrays
      data.colors.forEach((color) => formData.append("colors[]", color));
      data.sizes.forEach((size) => formData.append("sizes[]", size));

      // files
      data.images.forEach((img) => {
        if (img.file) {
          formData.append("images", img.file as File);
        }
      });
      await createProduct(formData).unwrap();
      toast.success("Product create successfully.");
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create product.");
    }
  };

  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">Create new product</h1>
      <ProductForm onSubmit={onSubmit} isLoading={isLoading} />
    </section>
  );
}

export default CreateProduct;
