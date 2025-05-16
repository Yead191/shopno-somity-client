"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/Spinner";
import { Link } from "react-router-dom";

export function MemberList({ members }) {
  const handleCall = (number) => {
    if (number) {
      const formatted = number.replace(/^0/, "880");
      window.open(`https://wa.me/${formatted}`, "_blank");
    }
  };
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {members?.map((member) => (
        <div
          key={member._id}
          className="flex flex-col items-center text-center space-y-2"
        >
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={member?.photo || "/placeholder.svg"}
              alt={member.name}
              className={"object-cover"}
            />
            <AvatarFallback>
              {member.name
                .split("")
                .map((n) => n[0])
                .join()
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Link
            to={`/dashboard/member-profile/${member._id}`}
            className="flex-grow"
          >
            <p className="font-medium text-sm">{member?.name}</p>
            <p className="text-xs text-muted-foreground">
              {member?.phoneNumber}
            </p>
          </Link>
          <Button
            onClick={() => handleCall(member?.phoneNumber)}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <Phone className="h-3 w-3 mr-1" /> Call
          </Button>
        </div>
      ))}
    </div>
  );
}
