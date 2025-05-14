import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Session as User } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";

type AppProps = { users: User[] | undefined; show?: boolean };

export default function AssignUserList({ users, show = false }: AppProps) {
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
          className="absolute w-full top-10"
        >
          {" "}
          <ScrollArea className="h-125">
            <Card className="w-full rounded-sm p-3 flex flex-col">
              {users && users.length > 0 ? (
                users.map((user) => (
                  <button
                    key={user.id}
                    className="flex justify-between hover:bg-muted gap-y-3.5 rounded-lg p-3 cursor-pointer"
                  >
                    <div className="text-left">{user.fullName}</div>
                    <div className="flex flex-col text-right">
                      <span>{user.phoneNumber}</span>
                      <span className="text-sm">
                        {user.email ?? "بدون ایمیل"}
                      </span>
                    </div>
                  </button>
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
