import React from "react";
import { Eye, EyeClosed } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

type InputProps = React.ComponentProps<"input">;

const PasswordInput = ({ className, ...props }: InputProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="relative">
      <Input
        className={cn("pr-8", className)}
        type={showPassword ? "text" : "password"}
        {...props}
      />
      <button
        type="button"
        className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? (
          <Eye className="size-4" />
        ) : (
          <EyeClosed className="size-4" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
