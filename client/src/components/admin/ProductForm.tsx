import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { productSchema, type ProductFormInputs } from "@/schema/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ImageUpload from "./ImageUpload";
import CategorySelect from "./CategorySelect";
import ColorsPicker from "./ColorsPicker";
import SizeSelector from "./SizeSelector";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import Tiptap from "../editor/Tiptap";
import { useEffect } from "react";

interface ProductFormProps {
  initialData?: any;
  onSubmit: (data: ProductFormInputs) => void;
  isLoading: boolean;
}

function ProductForm({ initialData, onSubmit, isLoading }: ProductFormProps) {
  const formData = initialData
    ? {
        name: initialData.name,
        description: initialData.description,
        category: initialData.category,
        colors: initialData.colors,
        sizes: initialData.sizes,
        instock_count:
          initialData.instock_count <= -1 ? 0 : initialData.instock_count,
        is_new_arrival: initialData.is_new_arrival,
        is_feature: initialData.is_feature,
        rating_count: initialData.rating_count,
        price: initialData.price,
        images: initialData.images.map((img: any) => ({
          url: img.url,
          public_alt: img.public_alt,
        })),
      }
    : {
        name: "",
        description: "",
        category: "",
        images: [],
        colors: [],
        sizes: [],
        instock_count: 0,
        is_new_arrival: false,
        is_feature: false,
        price: 0,
        rating_count: 0,
      };
  const form = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: formData,
  });

  useEffect(() => {
    if (initialData) {
      form.reset(formData);
    }
  }, [form, initialData]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <Tiptap value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="instock_count"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instock Count</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="number"
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="images"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <ImageUpload images={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <CategorySelect
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="sizes"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sizes</FormLabel>
                <FormControl>
                  <SizeSelector sizes={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          name="colors"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Colors</FormLabel>
              <FormControl>
                <ColorsPicker colors={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            name="is_new_arrival"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex items-center justify-between gap-2 border px-4 py-3 rounded-lg">
                <FormLabel>New Arrival</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="is_feature"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex items-center justify-between gap-2 border px-4 py-3 rounded-lg">
                <FormLabel>Featured Product</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="w-full cursor-pointer"
          type="submit"
          disabled={isLoading}
        >
          {isLoading
            ? "Saving Product..."
            : initialData
            ? "Update Product"
            : "Create Product"}
        </Button>
      </form>
    </Form>
  );
}

export default ProductForm;
