import React from "react";
import { useParams } from "next/navigation";
// form
import { RegisterOptions, useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ProductBodyCustomInput,
  ProductBodyCustomTextEditor,
} from "./product-custom-input";
import { useUpdateProductBody } from "../api/use-update-product-body";

type Props = {
  forApi: string;
  name: string;
  label: string;
  defaultValue?: string;
  registerOption?: RegisterOptions;
  inputType?: "text-editor" | "input";
  inputSize?: "sm" | "default";
};

export default function ProductBodyForm({
  defaultValue,
  forApi,
  inputType = "input",
  label,
  name,
  registerOption,
  inputSize,
}: Props) {
  const { productId } = useParams();
  const { mutate } = useUpdateProductBody(forApi);

  const inputRef = React.useRef(defaultValue ?? "");

  const form = useForm({
    mode: "onChange",
    defaultValues: {
      [name]: defaultValue ?? "",
    },
  });

  const onSubmit = (val: object) => {
    mutate(
      {
        productId: productId as string,
        ...val,
      },
      {
        onError: () => form.setValue(name, inputRef.current ?? ""),
        onSuccess: () => (inputRef.current = form.getValues(name)),
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name={name}
          rules={registerOption}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">{label}</FormLabel>
              <FormControl>
                {inputType === "input" ? (
                  <ProductBodyCustomInput
                    {...field}
                    disabled={!form.formState.isValid}
                    size={inputSize}
                  />
                ) : (
                  <ProductBodyCustomTextEditor {...field} />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
