import { Button } from "@/components/ui/button";
import { IoIosSearch } from "react-icons/io";
import { UserPlus } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import AddMemberForm from "./AddMemberForm";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import DashboardPagesHeader from "@/components/DashboardPagesHeader";
import MembersTable from "./MembersTable";
import useMember from "@/hooks/useMember";

const ManageMembers = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [sort, setSort] = useState("joinDate-desc");
  const sortOptions = {
    "joinDate-desc": "Join Date (Newest)",
    "joinDate-asc": "Join Date (Oldest)",
    "totalContributions-desc": "Total Contributions (High to Low)",
    "totalContributions-asc": "Total Contributions (Low to High)",
  };
  const [data, isLoading, refetch, error] = useMember(
    page,
    sort,
    search,
    selectedFilter
  );
  // Get all members data
  // const { data, isLoading, refetch, error } = useQuery({
  //   queryKey: ["members", page, sort, search, selectedFilter],
  //   queryFn: async () => {
  //     const { data } = await axios(
  //       `${
  //         import.meta.env.VITE_API_URL
  //       }/users?page=${page}&sort=${sort}&search=${search}&filter=${selectedFilter}`
  //     );
  //     return data;
  //   },
  // });

  // Pagination Functions
  const handlePageChange = (pageNumber) => setPage(pageNumber);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNextPage = () => {
    setPage((prev) => (prev < data.totalPages ? prev + 1 : prev));
  };

  // if (error) return "Error While Fetching Data";

  return (
    <div className="container mx-auto p-2">
      <DashboardPagesHeader
        title={"Manage Members"}
        subtitle={
          "Easily add and manage cooperative society members. View member details, contribution summaries, and onboard new members in one place."
        }
        icon={UserPlus}
      />

      {/* Searchbar & Select & Add button */}
      <div className="flex justify-between gap-2 items-center flex-wrap">
        {/* Searchbar */}
        <div className="relative w-full flex xl:flex-1">
          <input
            className="px-4 py-[5.3px] border border-border rounded-md w-full pl-[40px] outline-none focus:ring ring-gray-300"
            placeholder="Search Members..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <IoIosSearch className="absolute top-[9px] left-2 text-[1.5rem] text-[#adadad]" />
          {/* shortcut hint */}
          <button
            onClick={() => setSearch("")}
            className="absolute top-[4px] right-1.5 text-[0.6rem] font-bold border border-gray-300 p-[6px] rounded-md text-gray-500 cursor-pointer"
          >
            Clear
          </button>
        </div>
        <div className="flex items-center flex-wrap gap-2">
          {/* Filter by Contribution Range */}
          <div className="flex flex-1 w-fit">
            <Select
              className="w-fit"
              value={selectedFilter}
              onValueChange={setSelectedFilter}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter By Contributions" />
              </SelectTrigger>
              <SelectContent className="w-fit">
                <SelectItem value={"0-10000"}>{"0 - 10,000 BDT"}</SelectItem>
                <SelectItem value={"10001-50000"}>
                  {"10,001 - 50,000 BDT"}
                </SelectItem>
                <SelectItem value={"50001-100000"}>
                  {"50,001 - 100,000 BDT"}
                </SelectItem>
                <SelectItem value={"100001-1000000"}>
                  {"100,001+ BDT"}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          {/* Sort By */}
          <div className="flex flex-1 w-fit">
            <Select
              className="w-fit text-xs"
              value={sort}
              onValueChange={setSort}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sort By" className="text-xs">
                  {sortOptions[sort] || "Sort By"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="w-fit">
                {Object.entries(sortOptions).map(([value, label]) => (
                  <SelectItem key={value} value={value} className={"text-xs"}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Reset & Add Button */}
          <div className="flex items-center flex-wrap gap-2">
            <Button
              onClick={() => {
                setSearch("");
                setSelectedFilter("");
                setSort("joinDate-desc");
              }}
              className={"cursor-pointer"}
            >
              Reset
            </Button>
            <Button
              onClick={() => setIsFormOpen(!isFormOpen)}
              className={`cursor-pointer `}
              variant={`${isFormOpen ? "outline" : ""}`}
            >
              Add New Member
            </Button>
          </div>
        </div>
      </div>
      {/* Add Member Form */}
      {isFormOpen && (
        <div className={`${isFormOpen ? "visible" : "hidden"} mt-4`}>
          <AddMemberForm refetch={refetch} setIsFormOpen={setIsFormOpen} />
        </div>
      )}

      {/* Members Table */}
      <MembersTable members={data} isLoading={isLoading} refetch={refetch} />
    </div>
  );
};

export default ManageMembers;
