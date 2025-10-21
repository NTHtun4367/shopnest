import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { productSchema, type ProductFormInputs } from "@/schema/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ImageUpload from "./ImageUpload";

interface ProductFormProps {
  initialData?: any;
  onSubmit: (data: ProductFormInputs) => void;
  isLoading: boolean;
}

function ProductForm({ initialData, onSubmit, isLoading }: ProductFormProps) {
  const form = useForm<ProductFormInputs>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData || {
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
    },
  });

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
            </FormItem>
          )}
        />
        {/* description */}
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
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
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
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
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
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default ProductForm;
