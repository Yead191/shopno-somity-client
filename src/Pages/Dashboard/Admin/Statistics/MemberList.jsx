"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

// Mock data
const members = [
  {
    id: 1,
    name: "Md Iftikhar",
    phone: "01990025489",
    image: "/placeholder.svg?height=50&width=50",
    initials: "MI",
  },
  {
    id: 2,
    name: "Alamgir Sheikh",
    phone: "01785421641",
    image: "/placeholder.svg?height=50&width=50",
    initials: "AS",
  },
  {
    id: 3,
    name: "Md Shahid",
    phone: "01759355523",
    image: "/placeholder.svg?height=50&width=50",
    initials: "MS",
  },
  {
    id: 4,
    name: "Saifuddin Manzoor",
    phone: "01765689898",
    image: "/placeholder.svg?height=50&width=50",
    initials: "SM",
  },
  {
    id: 5,
    name: "Abu Taher",
    phone: "01766835888",
    image: "/placeholder.svg?height=50&width=50",
    initials: "AT",
  },
  {
    id: 6,
    name: "Farhad Ali",
    phone: "01788887",
    image: "/placeholder.svg?height=50&width=50",
    initials: "FA",
  },
];

export function MemberList() {
  const [activeMembers] = useState(members);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {activeMembers.map((member) => (
        <div
          key={member.id}
          className="flex flex-col items-center text-center space-y-2"
        >
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={member.image || "/placeholder.svg"}
              alt={member.name}
            />
            <AvatarFallback>{member.initials}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm">{member.name}</p>
            <p className="text-xs text-muted-foreground">{member.phone}</p>
          </div>
          <Button variant="outline" size="sm" className="w-full">
            <Phone className="h-3 w-3 mr-1" /> Call
          </Button>
        </div>
      ))}
    </div>
  );
}
