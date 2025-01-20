import { cn } from "@/lib/utils";

type Props = {
  count: number;
  current: number;
  onBulletClick: (index: number) => void;
};
export const CarouselBullets = ({ count, onBulletClick, current }: Props) => {
  const bulletArray = new Array(count).fill(null);

  return (
    <div className="flex gap-x-0.5 absolute inset-x-0 h-4 -bottom-10 justify-center items-center">
      {count > 1 &&
        bulletArray.map((_, index) => (
          <button
            key={index}
            className={cn(
              "size-1.5 bg-[#DBD3D3] ml-1 inline-block rounded-full transition-[width] duration-300 cursor-pointer",
              current === index + 1 && "w-6 bg-primary"
            )}
            onClick={() => onBulletClick(index)}
          />
        ))}
    </div>
  );
};
