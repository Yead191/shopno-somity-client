import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import TransactionReport from "/TransactionReport";
import TransactionSummary from "./TransactionSummary";
import TransactionCharts from "./TransactionCharts";
import TransactionReport from "./TransactionReport";

function TransactionDashboard() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="container mx-auto py-6">
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Financial Reports</h1>
          <TabsList>
            <TabsTrigger value="all">All Transactions</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all">
          <TransactionReport />
        </TabsContent>

        <TabsContent value="summary">
          <TransactionSummary />
        </TabsContent>

        <TabsContent value="charts">
          <TransactionCharts />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default TransactionDashboard;
