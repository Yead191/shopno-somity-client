"use client";

import { ArrowDown, ArrowUp } from "lucide-react";

export function StatCard({ title, value, icon, trend }) {
  return (
    <div className="bg-muted/50 rounded-lg p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {icon}
          <span className="text-sm font-medium">{title}</span>
        </div>
        {trend && (
          <div
            className={`flex items-center text-xs font-medium ${
              trend === "up" ? "text-green-600" : "text-red-600"
            }`}
          >
            {trend === "up" ? (
              <ArrowUp className="h-3 w-3 mr-1" />
            ) : (
              <ArrowDown className="h-3 w-3 mr-1" />
            )}
            {trend === "up" ? "Increase" : "Decrease"}
          </div>
        )}
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
}
