'use client';
import React, { useEffect, useState } from 'react';

import { CopyIcon } from "@radix-ui/react-icons"

import { Button, buttonVariants } from "~/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import Link from 'next/link';
import { Code2Icon, WebhookIcon } from 'lucide-react';
import { cn } from '~/lib/tailwind';

export function CopyAPIAuthorizationDialog({
  value
}: {
  value: string
}) {


  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost"
            className={cn(
              buttonVariants({ variant: 'outline', size: "icon" }),
              "h-9 w-9 p-0"
            )}
          >
            <Code2Icon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className='text-sm'>
              Machine to Machine Token
            </DialogTitle>
            <DialogDescription className='text-xs'>
              Anyone who has this token will be able to make authorized requests on your behalf. Keep it safe and secure. We are not responsible for any unauthorized access to your account.
              <br />
              <br />
              API:
              <Link
                target='_blank'
                rel='noopener'
                className='
              text-blue-500
              hover:underline
              ' href="https://vresume-server.onrender.com/api#/"> https://vresume-server.onrender.com/api#/</Link>
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                API Bearer Token
              </Label>
              <Input
                id="link"
                defaultValue={value}
                readOnly
              />
            </div>
            <Button type="button" size="sm" className="px-3" onClick={() => {
              navigator.clipboard.writeText(value)
            }}>
              <span className="sr-only">Copy</span>
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
