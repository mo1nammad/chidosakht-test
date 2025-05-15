import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Session as User } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import AssignUserIdentity from "./assign-user-identity";

type AppProps = {
  users: User[] | undefined;
  show?: boolean;
  onAssign: (user: User) => void;
};

export default function AssignUserList({
  users,
  show = false,
  onAssign,
}: AppProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
          }}
          transition={{
            duration: 0.1,
          }}
          className="absolute w-full top-10 min-w-102"
        >
          <ScrollArea className="h-125">
            <Card className="w-full rounded-sm p-3 flex flex-col">
              {users && users.length > 0 ? (
                users.map((user) => (
                  <AssignUserIdentity
                    key={user.id}
                    onAssign={onAssign}
                    user={user}
                  />
                ))
              ) : (
                <p className="text-xs m-auto py-2.5">
                  هیچ کاربری با چنین شماره ای وجود ندارد
                </p>
              )}
            </Card>
          </ScrollArea>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
