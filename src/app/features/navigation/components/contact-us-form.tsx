import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { cn, customErrorMap } from "@/lib/utils";
z.setErrorMap(customErrorMap);

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  email: z.string().email().max(64),
  name: z.string().trim().min(3).max(64),
  orgnazation: z.string().max(64).optional(),
  phone: z.coerce
    .string()
    .regex(
      /^(\+98|0)9[0-9]{9}$/,
      "شماره تماس باید با 09 یا +98 شروع شود و حداکثر 11 رقم باشد"
    ),
  message: z.string().max(256).optional(),
});

const ContactUsForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      message: "",
      name: "",
      orgnazation: "",
      phone: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <section className="text-right">
      <p className="font-yekan-light text-sm mb-2">اطلاعات در مورد ما</p>
      <h3 className="text-xl text-black mt-8 lg:mt-0">
        برای هر گونه سوال با ما تماس بگیرید
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 grid-flow-row gap-x-6 gap-y-4 mt-5 ">
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>نام شما</FormLabel>
                  <FormControl>
                    <Input
                      className={cn(fieldState.invalid && "border-destructive")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>ایمیل شما</FormLabel>
                  <FormControl>
                    <Input
                      className={cn(fieldState.invalid && "border-destructive")}
                      placeholder="eg. algoritatech@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>شماره تماس</FormLabel>
                  <FormControl>
                    <Input
                      className={cn(fieldState.invalid && "border-destructive")}
                      placeholder="09123456789"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="orgnazation"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>شرکت/محل کار</FormLabel>
                  <FormControl>
                    <Input
                      className={cn(fieldState.invalid && "border-destructive")}
                      placeholder="اختیاری"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field, fieldState }) => (
                <FormItem className="col-span-2">
                  <FormLabel>متن پیام شما</FormLabel>
                  <FormControl>
                    <Textarea
                      className={cn(
                        "min-h-[126px] resize-none",
                        fieldState.invalid && "border-destructive"
                      )}
                      placeholder="اختیاری"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="mt-8">ارسال درخواست</Button>
        </form>
      </Form>
    </section>
  );
};

export default ContactUsForm;
