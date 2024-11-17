"use client";
import { Banner } from "@/components/banner";
import { NoPermissionCard } from "@/components/no-permission-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { ProductCustomizationTable } from "@/drizzle/schema";
import { productCustomizationSchema } from "@/schema/products";
import { zodResolver } from "@hookform/resolvers/zod";
import { AsteriskIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function CustomizationForm({
  canRemoveBranding,
  canCustomizeBanner,
  customization,
}: {
  canRemoveBranding: boolean;
  canCustomizeBanner: boolean;
  customization: typeof ProductCustomizationTable.$inferSelect;
}) {
  const form = useForm<z.infer<typeof productCustomizationSchema>>({
    resolver: zodResolver(productCustomizationSchema),
    defaultValues: {
      ...customization,
      classPrefix: customization.classPrefix ?? "",
    },
  });

  const onSubmit = (values: z.infer<typeof productCustomizationSchema>) => {
    console.log(values);
  };

  const formValues = form.watch();

  return (
    <>
      <div>
        <Banner
          message={formValues.locationMessage}
          mappings={{
            country: "India",
            coupon: "HALF-OFF",
            discount: "50",
          }}
          customization={formValues}
          canRemoveBranding={canRemoveBranding}
        />
      </div>
      {!canCustomizeBanner && (
        <div className="mt-8">
          <NoPermissionCard />
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-6 flex-col mt-8"
        >
          <Card>
            <CardHeader>
              <CardTitle>Customization</CardTitle>
              <CardDescription>
                customize your banner message, it&apos;s content, color, font,
                bg color etc.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="locationMessage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        PPP Discount Message
                        <AsteriskIcon className="text-destructive inline size-3 align-top" />
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={!canCustomizeBanner}
                          className="min-h-20 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {"Data Parameters: {country}, {coupon}, {discount}"}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="backgroundColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Background color
                          <AsteriskIcon className="text-destructive inline size-3 align-top" />
                        </FormLabel>
                        <FormControl>
                          <Input disabled={!canCustomizeBanner} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="textColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Text color
                          <AsteriskIcon className="text-destructive inline size-3 align-top" />
                        </FormLabel>
                        <FormControl>
                          <Input disabled={!canCustomizeBanner} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="fontSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Font size
                          <AsteriskIcon className="text-destructive inline size-3 align-top" />
                        </FormLabel>
                        <FormControl>
                          <Input disabled={!canCustomizeBanner} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isSticky"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sticky?</FormLabel>
                        <FormControl>
                          <Switch
                            className="block"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={!canCustomizeBanner}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bannerContainer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Banner container
                          <AsteriskIcon className="text-destructive inline size-3 align-top" />
                        </FormLabel>
                        <FormControl>
                          <Input disabled={!canCustomizeBanner} {...field} />
                        </FormControl>
                        <FormDescription>
                          HTML container selector where you want to place the
                          banner. Ex: #container, .container, body
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="classPrefix"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CSS Prefix</FormLabel>
                        <FormControl>
                          <Input disabled={!canCustomizeBanner} {...field} />
                        </FormControl>
                        <FormDescription>
                          An optional prefix added to all CSS classes to avoid
                          conflicts
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              {canCustomizeBanner && (
                <div className="self-end">
                  <Button disabled={form.formState.isSubmitting} type="submit">
                    Save
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
}
