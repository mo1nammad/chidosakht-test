// import React from "react";
// import Image from "next/image";
// import { useParams } from "next/navigation";

// import { useProductsStore } from "../store/product";

// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Button } from "@/components/ui/button";
// import { cn } from "@/lib/utils";

// type Props = {
//   onImagePick?: (id: string) => void;
//   currentImageId?: string;
// };

// export default function ProductPricingImagePicker({
//   onImagePick,
//   currentImageId,
// }: Props) {
//   const { productId } = useParams();
//   const [open, setOpen] = React.useState(false);
//   const product = useProductsStore((state) =>
//     state.getProduct(Number(productId))
//   );

//   const handleClick = (imageId: number) => {
//     onImagePick?.(imageId.toString());
//     setOpen(false);
//   };

//   const currentId = currentImageId ? Number(currentImageId) : undefined;

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button variant="accent" className="mt-6">
//           انتخاب تصویر شاخص
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="min-w-64 p-0">
//         {product && product.gallery ? (
//           <ScrollArea className="min-h-60 h-89">
//             <div className="grid grid-cols-2 grid-flow-row gap-2 p-2">
//               {product.gallery.map((image) => (
//                 <Image
//                   src={image.url}
//                   alt={product.galleryAlt ?? ""}
//                   key={image.id}
//                   width={200}
//                   height={200}
//                   onClick={() => handleClick(image.id)}
//                   className={cn(
//                     "w-full transition hover:ring-2 hover:ring-primary rounded-lg cursor-pointer",
//                     currentId === image.id && "opacity-40 pointer-events-none"
//                   )}
//                 />
//               ))}
//             </div>
//           </ScrollArea>
//         ) : (
//           <div className="grid place-content-center p-4">
//             هیچ تصویری وجود ندارد
//           </div>
//         )}
//       </PopoverContent>
//     </Popover>
//   );
// }
