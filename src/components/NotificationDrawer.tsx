
import React, { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { NotificationList } from "./NotificationList";

export const NotificationDrawer = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange} direction="right">
      <DrawerContent className="max-w-sm w-full h-full right-0 top-0 fixed bg-white z-50">
        <DrawerHeader className="border-b pb-2">
          <DrawerTitle className="text-lg">নোটিফিকেশন</DrawerTitle>
        </DrawerHeader>
        <div className="p-3">
          <NotificationList />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
