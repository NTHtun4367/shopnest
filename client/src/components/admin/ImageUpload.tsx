import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ImageUploadProps {
  images: Array<{ preview: string; public_alt?: string }>;
  onChange: (
    images: Array<{ preview: string; file?: File; public_alt?: string }>
  ) => void;
}

function ImageUpload({ images, onChange }: ImageUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    onChange([...images, ...newImages]);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];

    if (images[index].preview.startsWith("blob:")) {
      URL.revokeObjectURL(images[index].preview);
    }

    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div>
      <div className="grid grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div className="relative mb-4 mt-2" key={index}>
            <img
              className="w-full h-32 object-cover rounded-lg"
              src={image.preview}
              alt={`Preview ${index + 1}`}
            />
            <Button
              className="absolute top-1 right-1 rounded-full w-8 h-8 hover:bg-destructive text-white cursor-pointer opacity-0 hover:opacity-100"
              type="button"
              variant={"secondary"}
              onClick={() => removeImage(index)}
            >
              <X className="font-bold" />
            </Button>
          </div>
        ))}
      </div>
      <Button
        className="cursor-pointer"
        type="button"
        variant={"outline"}
        onClick={() => document.getElementById("image_upload")?.click()}
      >
        Add Images
      </Button>
      <input
        type="file"
        id="image_upload"
        multiple
        accept="image/*"
        hidden
        onChange={handleFileChange}
      />
    </div>
  );
}

export default ImageUpload;
