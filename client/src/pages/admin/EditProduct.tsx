import type { ProductFormInputs } from "@/schema/product";
import ProductForm from "../../components/admin/ProductForm";
// import { useEditProductMutation } from "@/store/slices/productApi";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "@/store/slices/productApi";
import { useEffect } from "react";

function EditProduct() {
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const { id } = useParams();
  const {
    data: initialData,
    isLoading,
    isError,
  } = useGetProductDetailsQuery(id as string);
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

      const existingImages = data.images.filter(
        (img) => !img.file && img.url && img.public_alt
      );
      const newImages = data.images.filter((img) => img.file);

      formData.append("existingImages", JSON.stringify(existingImages));
      newImages.forEach((img) => {
        if (img.file) {
          formData.append("images", img.file as File);
        }
      });

      await updateProduct({ id: id!, formData }).unwrap();
      toast.success("Product update successfully.");
      navigate("/admin/manage-products");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update product.");
    }
  };

  useEffect(() => {
    if (isError) navigate("/admin");
  }, [isError]);

  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">Edit product</h1>
      <ProductForm
        onSubmit={onSubmit}
        isLoading={isLoading || isUpdating}
        initialData={initialData}
      />
    </section>
  );
}

export default EditProduct;
