import IsError from "@/authentication/IsError";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { imgUpload } from "@/lib/imgUpload";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaFileUpload } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const AddMemberForm = ({  setIsFormOpen }) => {
  const [memberId, setMemberId] = useState(""); // Replaced role with memberId
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [joinDate, setJoinDate] = useState(""); 
  const [phoneNumber, setPhoneNumber] = useState(880);
  const [preview, setPreview] = useState("");
  const [isError, setIsError] = useState("");
  const [loading, setLoading] = useState(false);

  // Image Upload Functionality
  const handleUploadImage = () => {
    document.getElementById("image_input").click();
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Bangladeshi phone number validation
  const validateBangladeshiNumber = (number) => {
    const cleanNumber = number.replace(/[^\d+]/g, "");
    const bdNumberRegex = /^\8801[3-9][0-9]{8}$/;
    return bdNumberRegex.test(cleanNumber);
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhoneNumber(value);
    if (value && !validateBangladeshiNumber(value)) {
      setIsError(
        "Please Enter A Valid Bangladeshi Phone Number \n (e.g., +880 1XNN-NNNNNN)"
      );
    } else {
      setIsError("");
    }
  };

  // Confirm Modal
  const showConfirmModal = (name, memberId) => {
    Swal.fire({
      html: `
         <div class="bg-background text-foreground p-4 mt-4 rounded-2xl max-w-md w-full border space-y-8">
          <!-- Success Icon and Message -->
          <div class="text-center space-y-2">
            <div class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mx-auto">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 class="text-xl font-bold">Member Successfully Added</h2>
            <p class="text-sm px-8 -mt-2 text-muted-foreground">The member has been added to the cooperative society. Share their details as needed.</p>
          </div>

           <!-- Title -->
           <div class="text-center -mt-5">
             <span class="inline-flex items-center rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
               Member Details
             </span>
           </div>
         
           <!-- Credentials Section -->
           <div class="space-y-2 -mt-5">
             <!-- Name -->
             <div class="flex flex-col justify-start space-y-1.5">
               <p for="copy-name" class="text-sm text-left font-medium text-gray-700">Name</p>
               <div class="relative">
                 <input id="copy-name" readonly type="text" value="${name}" class="w-full rounded-lg border bg-muted px-4 py-2 pr-12 text-sm font-medium text-primary focus:outline-none" />
               </div>
             </div>
         
             <!-- Member ID -->
             <div class="flex flex-col justify-start space-y-1.5">
               <p for="copy-memberId" class="text-sm text-left font-medium text-gray-700">Member ID</p>
               <div class="relative">
                 <input id="copy-memberId" readonly type="text" value="${memberId}" class="w-full rounded-lg border bg-muted px-4 py-2 pr-12 text-sm font-medium text-primary focus:outline-none" />
                 <button
                   onclick="copyToClipboard('copy-memberId')"
                   class="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition"
                 >
                   <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                   </svg>
                 </button>
               </div>
             </div>
           </div>
         
           <!-- Improved Warning Notice -->
           <div class="flex items-start -mt-4 gap-3 p-2 rounded-xl border border-yellow-300 bg-yellow-100/60 text-yellow-900 text-sm">
             <div>
               <p class="font-semibold">⚠️ Important Notice</p>
               <p class="mt-1">Please copy the member details now. These details won’t be shown again after closing this modal. And after copying, the modal will be closed!</p>
             </div>
           </div>
         </div>
      `,
      confirmButtonText: "Ok, Close",
      confirmButtonColor: "#000",
      background: "#f3f4f6",
      didOpen: () => {
        window.copyToClipboard = (id) => {
          const input = document.getElementById(id);
          const text = input.value;
          navigator.clipboard
            .writeText(text)
            .then(() => {
              Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Copied to clipboard!",
                text: "Member details have been copied successfully.",
                showConfirmButton: false,
                timer: 3000,
                background: "#ffffff",
                customClass: {
                  title: "text-blue-800 font-semibold",
                  content: "text-gray-600",
                },
              });
            })
            .catch(() => {
              Swal.fire({
                toast: true,
                position: "top-end",
                icon: "error",
                title: "Copy failed",
                text: "Unable to copy text to clipboard.",
                showConfirmButton: false,
                timer: 2000,
                background: "#ffffff",
                customClass: {
                  title: "text-red-800 font-semibold",
                  content: "text-gray-600",
                },
              });
            });
        };
      },
      customClass: {
        title: "text-2xl font-bold",
        confirmButton: "px-6 py-2 text-white bg-black font-semibold rounded-md",
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Show error if image not selected
    if (!image) {
      setLoading(false);
      setIsError("Please Select An Image For Your Profile!");
      return;
    }

    // Upload Image To imgBB
    // const imageUrl = await imgUpload(image);
    // if (!imageUrl) {
    //   setLoading(false);
    //   setIsError("Image Upload Failed! Try Again");
    //   return;
    // }

    // Member ID and Join Date Validation
    if (!memberId) {
      setLoading(false);
      setIsError("Member ID is Required");
      return;
    }

    if (!joinDate) {
      setLoading(false);
      setIsError("Join Date is Required");
      return;
    }

    // Phone Number Validation
    if (!validateBangladeshiNumber(phoneNumber)) {
      setLoading(false);
      setIsError(
        "Please Enter A Valid Bangladeshi Phone Number \n (e.g., +880 1XNN-NNNNNN)"
      );
      return;
    }

    const member = {
      memberId,
      name,
      joinDate,
      photo: imageUrl,
      phoneNumber,
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/cooperative/members`,
        member
      );
      if (data?.insertedId) {
        setIsFormOpen(false);
        // refetch();
        setIsError("");
        setMemberId("");
        setName("");
        setImage("");
        setJoinDate("");
        setPhoneNumber(880);
        setPreview("");
        showConfirmModal(name, memberId);
      }
    } catch (error) {
      const errMsg = error?.response?.data?.message || "Something went wrong!";
      setIsError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border shadow-none border-[#e5e7eb] w-full py-6 rounded-lg">
      <CardContent className="px-4">
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Name, Member ID, Join Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Name */}
            <div className="w-full space-y-2">
              <Label>Name</Label>
              <Input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={"Enter Member Name"}
              />
            </div>
            {/* Member ID */}
            <div className="w-full space-y-2">
              <Label>Member ID</Label>
              <Input
                type="text"
                required
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                placeholder={"Enter Member ID"}
              />
            </div>
            {/* Join Date */}
            <div className="w-full space-y-2">
              <Label>Join Date</Label>
              <Input
                type="date"
                required
                value={joinDate}
                onChange={(e) => setJoinDate(e.target.value)}
              />
            </div>
          </div>
          {/* Phone Number, Photo */}
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-4">
            {/* Phone Number */}
            <div className="w-full space-y-2">
              <Label>Phone Number</Label>
              <Input
                type="number"
                required
                value={phoneNumber}
                onChange={handlePhoneChange}
                pattern="\8801[3-9][0-9]{8}"
                maxLength={13}
                placeholder={"Enter Phone Number"}
              />
            </div>
            {/* Photo */}
            <div className="w-full space-y-2">
              <Label>Profile Photo</Label>
              <div className="w-full">
                <Input
                  type="file"
                  name="image"
                  id="image_input"
                  className="hidden"
                  onChange={handleFileChange}
                />
                {preview === "" ? (
                  <div
                    className="w-full md:w-[100%] flex items-center gap-3 border py-[5.6px] rounded-lg px-4 cursor-pointer"
                    onClick={handleUploadImage}
                  >
                    <FaFileUpload className="text-[1.5rem] text-gray-500" />
                    <p className="text-gray-700 text-xs">
                      Browse To Upload Profile Photo
                    </p>
                  </div>
                ) : (
                  <div className="w-full border rounded-lg p-0.5 flex justify-between items-center gap-4">
                    <div className="flex items-center gap-2 pl-2">
                      <img
                        src={preview}
                        alt="Selected file preview"
                        className="mx-auto object-cover rounded-lg w-7 h-7"
                      />
                      {image && (
                        <div>
                          <p className="text-[10px] font-medium text-gray-700">
                            {image.name}
                          </p>
                          <p className="text-[9px] text-gray-500">
                            {(image.size / 1024).toFixed(2)} KB | {image.type}
                          </p>
                        </div>
                      )}{" "}
                    </div>
                    <MdDelete
                      className="text-[2rem] text-white bg-[#000000ad] p-1 rounded-r-lg mr-[1px] cursor-pointer"
                      onClick={() => {
                        setPreview("");
                        setImage(null);
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* Error */}
          <div className="mt-4 mb-4">
            <IsError isError={isError} />
          </div>
          {/* Add Member Button */}
          <Button
            type="submit"
            disabled={loading}
            className={"cursor-pointer px-8"}
          >
            {loading ? "Adding Member..." : "Add Member"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddMemberForm;
