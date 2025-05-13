import IsError from "@/authentication/IsError";
import { imgUpload } from "@/components/imgUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useState } from "react";
import { FaFileUpload, FaEye, FaEyeSlash, FaCopy } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "sonner";

const AssignUserForm = ({ refetch, setIsFormOpen }) => {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [email, setEmail] = useState("");
  const [preview, setPreview] = useState("");
  const [isError, setIsError] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [strongPassword, setStrongPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmedPassword, setShowConfirmedPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({
    role: "",
    email: "",
    password: "",
  });
  const [signal, setSignal] = useState({
    lowercase: false,
    uppercase: false,
    number: false,
    symbol: false,
    length: false,
    strong: false,
  });

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
    const cleanNumber = number.replace(/[^\d]/g, "");
    const bdNumberRegex = /^01[3-9][0-9]{8}$/;
    return bdNumberRegex.test(cleanNumber);
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    setPhoneNumber(value);
    if (value && !validateBangladeshiNumber(value)) {
      setIsError(
        "Please Enter A Valid Bangladeshi Phone Number \n (e.g., 01XNN-NNNNNN)"
      );
    } else {
      setIsError("");
    }
  };

  // Email validation
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Password Validation Functionality
  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setStrongPassword(password);

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setSignal({
      lowercase: hasLowerCase,
      uppercase: hasUpperCase,
      number: hasNumber,
      symbol: hasSymbol,
      length: password.length >= 8,
      strong:
        hasUpperCase &&
        hasLowerCase &&
        hasNumber &&
        hasSymbol &&
        password.length >= 8,
    });
  };

  // Copy to Clipboard
  const copyToClipboard = (text, type) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast({
          title: "Copied to clipboard!",
          description: `${type} has been copied successfully.`,
          variant: "success",
        });
      })
      .catch(() => {
        toast({
          title: "Copy failed",
          description: `Unable to copy ${type} to clipboard.`,
          variant: "destructive",
        });
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Image validation

    // Upload Image To imgBB
    try {
      if (image) {
        // Upload Image To imgBB
        const data = await imgUpload(image);
        setImageUrl(data);
        // console.log(imageUrl);
        // Show error if image upload failed
        if (!data) {
          setLoading(false);
          setIsError("Image Upload Failed! Try Again");
          return;
        }
      }
    } catch (error) {
      setLoading(false);
      setIsError("Image Upload Failed! Try Again");
      return;
    }

    // Role Validation
    if (!role) {
      setLoading(false);
      setIsError("Role Is Required");
      return;
    }

    // Email Validation
    if (!email || !validateEmail(email)) {
      setLoading(false);
      setIsError("Please Enter A Valid Email Address");
      return;
    }

    // Password Validation
    if (!signal.lowercase) {
      setLoading(false);
      setIsError("Password must contain at least one lowercase letter.");
      return;
    }
    if (!signal.uppercase) {
      setLoading(false);
      setIsError("Password must contain at least one uppercase letter.");
      return;
    }
    if (!signal.number) {
      setLoading(false);
      setIsError("Password must contain at least one number.");
      return;
    }
    if (!signal.symbol) {
      setLoading(false);
      setIsError("Password must contain at least one special character.");
      return;
    }
    if (!signal.length) {
      setLoading(false);
      setIsError("Password must be at least 8 characters long.");
      return;
    }
    if (!signal.strong) {
      setLoading(false);
      setIsError("Password strength is too weak.");
      return;
    }

    // Confirmed Password Validation
    if (strongPassword !== confirmedPassword) {
      setLoading(false);
      setIsError("Passwords do not match.");
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

    const user = {
      role,
      email,
      name,
      password: strongPassword,
      photo: imageUrl
        ? imageUrl
        : "https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png",
      phoneNumber,
      isActive: true,
    };

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/assign-user`,
        user
      );
      console.log(data);
      // Check for success based on response structure
      if (
        data?.firestore?.insertedId ||
        data?.message === "User Created Successfully"
      ) {
        refetch();
        setIsError("");
        setRole("");
        setName("");
        setImage("");
        setEmail("");
        setPreview("");
        setPhoneNumber("+880");
        setStrongPassword("");
        setConfirmedPassword("");
        setShowPassword(false);
        setShowConfirmedPassword(false);
        setModalData({
          role: user.role,
          email: user.email,
          password: user.password,
        });
        setIsModalOpen(true);
      } else {
        setIsError("Unexpected response from server. Please try again.");
      }
    } catch (error) {
      // Log the error for debugging
      console.error("Error during user assignment:", error);
      const errMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to assign user. Please try again.";
      setIsError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  console.log(modalData);
  return (
    <>
      <Card className="border shadow-none border-[#e5e7eb] w-full py-6 rounded-lg">
        <CardContent className="px-4">
          <form onSubmit={handleSubmit} className="space-y-2">
            {/* Name, Email, Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Name */}
              <div className="w-full space-y-2">
                <Label>Username</Label>
                <Input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={"Enter Username"}
                />
              </div>
              {/* Email */}
              <div className="w-full space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={"Enter User Email"}
                />
              </div>
              {/* Select Role */}
              <div className="w-full space-y-2">
                <Label>Select Role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            {/* PhoneNumber, Photo */}
            <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-4">
              {/* PhoneNumber */}
              <div className="w-full space-y-2">
                <Label>Phone Number</Label>
                <Input
                  type="tel"
                  inputMode="numeric"
                  required
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  pattern="\01[3-9][0-9]{8}"
                  maxLength={11}
                  placeholder={"Enter Phone Number"}
                />
              </div>
              {/* Photo */}
              <div className="w-full space-y-2">
                <Label>Select Photo</Label>
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
                        )}
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
            {/* Password, Confirmed Password */}
            <div className="grid mt-4 grid-cols-1 md:grid-cols-2 place-items-center gap-4">
              {/* Password */}
              <div className="w-full space-y-2">
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    value={strongPassword}
                    onChange={handlePasswordChange}
                    placeholder={"Enter Strong Password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              {/* Confirmed Password */}
              <div className="w-full space-y-2">
                <Label>Confirmed Password</Label>
                <div className="relative">
                  <Input
                    type={showConfirmedPassword ? "text" : "password"}
                    required
                    value={confirmedPassword}
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                    placeholder={"Confirm Password"}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmedPassword(!showConfirmedPassword)
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmedPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>
            {/* Error */}
            <div className="mt-4 mb-4">
              <IsError isError={isError} />
            </div>
            {/* Add User Button */}
            <Button
              type="submit"
              disabled={loading}
              className={"cursor-pointer px-8"}
            >
              {loading ? "Assigning User..." : "Assign User"}
            </Button>
          </form>
        </CardContent>
      </Card>
      {/* Confirmation Modal */}
      <Dialog
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) setIsFormOpen(false);
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">
              Account Successfully Created
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Success Message */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mx-auto">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <p className="text-sm text-muted-foreground">
                The user account has been created. Share these credentials with
                the user.
              </p>
            </div>

            {/* Role Title */}
            <div className="text-center">
              <span className="inline-flex items-center rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                Account Credentials
              </span>
            </div>

            {/* Credentials Section */}
            <div className="space-y-4">
              {/* Email */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="copy-email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </Label>
                <div className="relative">
                  <Input
                    id="copy-email"
                    readOnly
                    value={modalData?.email}
                    className="pr-10"
                  />
                  <button
                    onClick={() => copyToClipboard(modalData?.email, "Email")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
                  >
                    <FaCopy />
                  </button>
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label
                  htmlFor="copy-password"
                  className="text-sm font-medium text-gray-700"
                >
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="copy-password"
                    readOnly
                    value={modalData?.password}
                    className="pr-10"
                  />
                  <button
                    onClick={() =>
                      copyToClipboard(modalData?.password, "Password")
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
                  >
                    <FaCopy />
                  </button>
                </div>
              </div>
            </div>

            {/* Warning Notice */}
            <div className="flex items-start gap-3 p-3 rounded-xl border border-yellow-300 bg-yellow-100/60 text-yellow-900 text-sm">
              <div>
                <p className="font-semibold">⚠️ Important Notice</p>
                <p className="mt-1">
                  Please copy the password now. For security reasons, this
                  password won’t be shown again after closing this modal.
                </p>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              onClick={() => setIsModalOpen(false)}
              className="px-6 py-2 text-white bg-black font-semibold rounded-md"
            >
              Ok, Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AssignUserForm;
