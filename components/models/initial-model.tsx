"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileUpload } from "../file-upload";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Server name is required",
  }),
  imageUrl: z.string().min(1, {
    message: "Server image is required",
  }),
});

export const InitialModal = () => {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    }
  })
  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post("/api/servers", values);
      form.reset();
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open>
      <DialogContent className="fixed z-50 left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-gradient-to-br from-indigo-900/95 via-purple-900/95 to-zinc-900/95 backdrop-blur-xl border border-white/10 text-white p-0 overflow-hidden shadow-2xl rounded-3xl max-w-md w-full">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-3xl text-center font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200">
            Customize your server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-300 mt-2">
            Give your server a personality with a name and an image. You can always change it later.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="uppercase text-xs font-bold text-indigo-200/70 tracking-wider">
                        Server name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-black/20 border-0 focus-visible:ring-2 focus-visible:ring-indigo-500/50 text-white placeholder-zinc-400/50 rounded-xl h-12 transition-all focus:bg-black/30"
                          placeholder="Enter Server Name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-rose-400" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="bg-black/20 px-6 py-4">
              <Button
                variant="primary"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 h-11 rounded-xl"
              >
                Create Server
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
