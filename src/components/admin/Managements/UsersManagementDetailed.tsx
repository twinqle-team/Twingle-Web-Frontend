import { useState } from "react";
import {
  ArrowLeft,
  AlertTriangle,
  Shield,
  Mail,
  Calendar,
  Building2,
  User,
  Phone,
  Ban,
  CheckCircle,
  Trash2,
  Send,
  CreditCard,
  FileText,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast, ToastContainer } from "react-toastify";
import { getMockDetail } from "./mockUserData";

interface UserVendorDetailProps {
  type: "user" | "vendor" | "admin" | "customerCare";
  id: string | null;
  onBack: () => void;
}

export function UsersManagementDetailed({ type, id, onBack }: UserVendorDetailProps) {
  /* ---------------------------------------------------------- */
  /* local state                                                */
  /* ---------------------------------------------------------- */
  const [adminNotes, setAdminNotes] = useState("");
  // const [isBlocked, setIsBlocked] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [messageTitle, setMessageTitle] = useState("");
  const data = getMockDetail(type === "customerCare" ? "admin" : type, id) as any;
  const [isBlockedStatus, setIsBlockedStatus] = useState(Boolean(data?.isBlocked));
  const blockUnblockDeleteMutation = { isPending: false };
  const sendPrivateMessageMutation = { isPending: false };

  // Determine the actual type based on admin role
  const actualType =
    type === "admin" && data?.role === "customerCare"
      ? "customerCare"
      : type;

  const entityLabel =
    type === "user"
      ? "User"
      : type === "vendor"
        ? "Vendor"
        : data?.role || "Admin";

  // Check if user is super admin (hide quick actions)
  const isSuperAdmin =
    type === "admin" && data?.role === "Super Admin";

  // Check if user is admin or customer care (hide private messages)
  const shouldHidePrivateMessages =
    (type === "admin" || actualType === "customerCare") &&
    data?.role !== "Super Admin";

  /* ---------------------------------------------------------- */
  /* early states                                               */
  /* ---------------------------------------------------------- */
  if (!data)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-2 bg-background">
        <p className="text-muted-foreground">Could not load {type} details.</p>
        <Button onClick={onBack}>Go back</Button>
      </div>
    );

  /* ---------------------------------------------------------- */
  /* derived helpers                                            */
  /* ---------------------------------------------------------- */
  const getDisplayName = () =>
    type === "user" ? data.name : data.storeName || data.name;

  const getStatusInfo = () => {
    if (type === "user")
      return {
        label: data.isverified ? "Verified" : "Not verified",
        variant: data.isverified
          ? ("default" as const)
          : ("destructive" as const),
      };
    return {
      label: data.verificationStatus || data.kycStatus || "Pending",
      variant: getStatusBadgeVariant(data.verificationStatus || data.kycStatus),
    };
  };

  const getStatusBadgeVariant = (st?: string) => {
    switch (st?.toLowerCase()) {
      case "verified":
      case "approved":
      case "active":
        return "default";
      case "pending":
        return "secondary";
      case "rejected":
      case "blocked":
        return "destructive";
      default:
        return "outline";
    }
  };

  /* ---------------------------------------------------------- */
  /* handlers                                                   */
  /* ---------------------------------------------------------- */
  const handleBlockToggle = () => setShowBlockModal(true);
  const confirmBlock = () => {
    if (!id) return;
    setIsBlockedStatus((blocked) => !blocked);
    setShowBlockModal(false);
    toast.success(`${isBlockedStatus ? "Unblocked" : "Blocked"} ${getDisplayName()}`);
  };
  const handleDelete = () => setShowDeleteModal(true);
  const confirmDelete = () => {
    if (!id) return;
    toast.success(`${getDisplayName()} deleted from mock data`);
    setShowDeleteModal(false);
    onBack();
  };
  const sendMessage = () => {
    if (!messageText.trim() || !messageTitle.trim()) return;
    toast.success("Message queued in mock data");
    setMessageText("");
    setMessageTitle("");
    setShowMessageModal(false);
  };
  const handleSaveNote = () => {
    if (!adminNotes.trim()) return;
    toast.success("Note saved in mock data");
    setAdminNotes("");
  };

  /* ---------------------------------------------------------- */
  /* render                                                     */
  /* ---------------------------------------------------------- */
  const statusInfo = getStatusInfo();

  return (
    <div className="min-h-screen bg-background">
      {/* ------- header ------- */}
      <header className="border-b border-border bg-card">
        <div className="container px-6 py-4 mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to{" "}
              {type === "user"
                ? "Users"
                : type === "vendor"
                  ? "Vendors"
                  : "Admins"}
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <h1 className="text-2xl font-bold text-foreground">
              {type === "user"
                ? "User"
                : type === "vendor"
                  ? "Vendor"
                  : data?.role || "Admin"}{" "}
              Details
            </h1>
          </div>
        </div>
      </header>

      <div className="container px-6 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* -------------- main info card -------------- */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-20 h-20">
                      <AvatarImage
                        src={
                          type === "vendor"
                            ? data.avatar || data.businessLogo
                            : data.avatar
                        }
                        alt={getDisplayName()}
                      />
                      <AvatarFallback className="text-lg">
                        {getDisplayName()
                          ?.split(" ")
                          .map((n: any) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <h2 className="text-2xl font-bold">{getDisplayName()}</h2>
                      <p className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="w-4 h-4" />
                        {data.email}
                      </p>
                      {(data.phoneNumber || data.storePhone) && (
                        <p className="flex items-center gap-2 mt-1 text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          {data.phoneNumber || data.storePhone}
                        </p>
                      )}
                    </div>
                  </div>

                  <Badge
                    variant={statusInfo.variant as any}
                    className="text-sm"
                  >
                    {isBlockedStatus ? "Blocked" : statusInfo.label}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* ---- basic info ---- */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {type === "admin" ? (
                      <>
                        <div className="flex items-center gap-3">
                          <User className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Role
                            </p>
                            <p className="font-medium">
                              {data.role || "Admin"}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Shield className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Admin ID
                            </p>
                            <p className="font-medium">{data._id || "N/A"}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Version
                            </p>
                            <p className="font-medium">v{data.__v || 0}</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-3">
                          {type === "user" ? (
                            <User className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <Building2 className="w-5 h-5 text-muted-foreground" />
                          )}
                          <div>
                            <p className="text-sm text-muted-foreground">
                              {type === "user" ? "Role" : "Store Type"}
                            </p>
                            <p className="font-medium">
                              {type === "user"
                                ? "User"
                                : data.storeType || "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Join Date
                            </p>
                            <p className="font-medium">
                              {new Date(
                                data.createdAt || data.joinDate,
                              ).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        {type === "vendor" && data.kycStatus && (
                          <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-muted-foreground" />
                            <div>
                              <p className="text-sm text-muted-foreground">
                                KYC Status
                              </p>
                              <Badge
                                variant={getStatusBadgeVariant(data.kycStatus)}
                              >
                                {data.kycStatus}
                              </Badge>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* ---- statistics ---- */}
                <div>
                  <h3 className="mb-4 text-lg font-semibold">Statistics</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {type === "user" ? (
                      <>
                        <div className="p-4 text-center rounded-lg bg-muted/50">
                          <p className="text-2xl font-bold text-primary">
                            {data.orders?.length || 0}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Total Orders
                          </p>
                        </div>
                      </>
                    ) : type === "vendor" ? (
                      <>
                        <div className="p-4 text-center rounded-lg bg-muted/50">
                          <p className="text-2xl font-bold text-primary">
                            {data.products?.length}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Total Products
                          </p>
                        </div>
                        <div className="p-4 text-center rounded-lg bg-muted/50">
                          <p className="text-2xl font-bold text-primary">
                            $
                            {(data.payments || []).reduce(
                              (sum: number, p: any) => sum + (p.amount || 0),
                              0,
                            )}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Total Sales
                          </p>
                        </div>
                        <div className="p-4 text-center rounded-lg bg-muted/50">
                          <p className="text-2xl font-bold text-primary">
                            {data.orders?.length || 0}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Total Orders
                          </p>
                        </div>
                      </>
                    ) : (
                      // Admin statistics
                      <>
                        <div className="p-4 text-center rounded-lg bg-muted/50">
                          <p className="text-2xl font-bold text-primary">
                            {data.requests?.length || 0}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Total Requests
                          </p>
                        </div>
                        <div className="p-4 text-center rounded-lg bg-muted/50">
                          <p className="text-2xl font-bold text-primary">
                            {data.orders?.length || 0}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Total Orders
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* ---- admin requests section ---- */}
                {type === "admin" &&
                  data.requests &&
                  data.requests.length > 0 && (
                    <div>
                      <h3 className="mb-4 text-lg font-semibold">
                        Admin Requests
                      </h3>
                      <div className="space-y-4">
                        {data.requests.map((request: any, index: number) => (
                          <Card key={request._id || index}>
                            <CardHeader>
                              <div className="flex items-center justify-between">
                                <div>
                                  <CardTitle className="text-base">
                                    {request.storeName || request.name}
                                  </CardTitle>
                                  <p className="text-sm text-muted-foreground">
                                    {request.email}
                                  </p>
                                </div>
                                <Badge
                                  variant={getStatusBadgeVariant(
                                    request.verificationStatus,
                                  )}
                                  className="text-sm"
                                >
                                  {request.verificationStatus || "Pending"}
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Building2 className="w-4 h-4" />
                                  <span>
                                    Store Type: {request.storeType || "N/A"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Phone className="w-4 h-4" />
                                  <span>{request.storePhone || "N/A"}</span>
                                </div>
                                {request.subscription && (
                                  <>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <Shield className="w-4 h-4" />
                                      <span>
                                        Plan:{" "}
                                        {request.subscription.currentPlan ||
                                          "N/A"}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <Calendar className="w-4 h-4" />
                                      <span>
                                        Billing:{" "}
                                        {request.subscription.billingCycle ||
                                          "N/A"}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                      <Shield className="w-4 h-4" />
                                      <span>
                                        Status:{" "}
                                        {request.subscription.status || "N/A"}
                                      </span>
                                    </div>
                                  </>
                                )}
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Calendar className="w-4 h-4" />
                                  <span>
                                    Created:{" "}
                                    {new Date(
                                      request.createdAt,
                                    ).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}

                {/* ---- admin orders section ---- */}
                {type === "admin" && data.orders && data.orders.length > 0 && (
                  <div>
                    <h3 className="mb-4 text-lg font-semibold">Admin Orders</h3>
                    <div className="space-y-4">
                      {data.orders.map((order: any, index: number) => (
                        <Card key={order._id || index}>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-base">
                                  Order #{order.orderId || index + 1}
                                </CardTitle>
                                <p className="text-sm text-muted-foreground">
                                  {order.customerName || "Unknown Customer"}
                                </p>
                              </div>
                              <Badge
                                variant={getStatusBadgeVariant(order.status)}
                                className="text-sm"
                              >
                                {order.status || "Pending"}
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4" />
                                <span>
                                  Order Date:{" "}
                                  {new Date(
                                    order.createdAt || order.orderDate,
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <CreditCard className="w-4 h-4" />
                                <span>
                                  Amount: $
                                  {order.totalAmount || order.amount || "0.00"}
                                </span>
                              </div>
                              {order.paymentMethod && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <CreditCard className="w-4 h-4" />
                                  <span>Payment: {order.paymentMethod}</span>
                                </div>
                              )}
                              {order.products && order.products.length > 0 && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Building2 className="w-4 h-4" />
                                  <span>Products: {order.products.length}</span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {type === "vendor" && data.bankAccount && (
                  <div>
                    <h3 className="mb-4 text-lg font-semibold">Bank Account</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Bank Name
                          </p>
                          <p className="font-medium">
                            {data.bankAccount.bankName}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Account Name
                          </p>
                          <p className="font-medium">
                            {data.bankAccount.account_name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Account Number
                          </p>
                          <p className="font-medium">
                            {data.bankAccount.account_number}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* -------------- actions sidebar -------------- */}
          <div className="space-y-6">
            <Card className="border-primary/20 shadow-sm">
              <CardHeader className="border-b bg-muted/30 pb-4">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Shield className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Manage access and communication for this {entityLabel.toLowerCase()}.
                </p>
              </CardHeader>
              <CardContent className="space-y-3 pt-5">
                {!isSuperAdmin && (
                  <>
                    <Button
                      variant={isBlockedStatus ? "default" : "destructive"}
                      className="flex items-center justify-start w-full gap-2"
                      onClick={handleBlockToggle}
                      disabled={blockUnblockDeleteMutation.isPending}
                    >
                      {blockUnblockDeleteMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          {isBlockedStatus ? "Unblocking..." : "Blocking..."}
                        </>
                      ) : isBlockedStatus ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Unblock{" "}
                          {type === "user"
                            ? "User"
                            : type === "vendor"
                              ? "Vendor"
                              : data?.role || "Admin"}{" "}
                        </>
                      ) : (
                        <>
                          <Ban className="w-4 h-4" />
                          Block{" "}
                          {type === "user"
                            ? "User"
                            : type === "vendor"
                              ? "Vendor"
                              : data?.role || "Admin"}{" "}
                        </>
                      )}
                    </Button>

                    {!shouldHidePrivateMessages && (
                      <Button
                        variant="outline"
                        className="flex items-center justify-start w-full gap-2 bg-transparent"
                        onClick={() => setShowMessageModal(true)}
                        disabled={blockUnblockDeleteMutation.isPending}
                      >
                        <Mail className="w-4 h-4" />
                        Send Private Message
                      </Button>
                    )}

                    <Button
                      variant="destructive"
                      className="flex items-center justify-start w-full gap-2"
                      onClick={handleDelete}
                      disabled={blockUnblockDeleteMutation.isPending}
                    >
                      {blockUnblockDeleteMutation.isPending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Deleting...
                        </>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4" />
                          Delete{" "}
                          {type === "user"
                            ? "User"
                            : type === "vendor"
                              ? "Vendor"
                              : data?.role || "Admin"}{" "}
                        </>
                      )}
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* ---- admin notes ---- */}
            <Card>
              <CardHeader>
                <CardTitle>Admin Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="existing-notes">Existing Notes</Label>
                  <div className="p-3 mt-2 rounded-md bg-muted/50">
                    <p className="text-sm text-muted-foreground">
                      {data.notes || "No existing notes."}
                    </p>
                  </div>
                </div>
                <div>
                  <Label htmlFor="admin-notes">Add New Note</Label>
                  <Textarea
                    id="admin-notes"
                    placeholder="Add administrative notes..."
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <Button
                  className="w-full"
                  onClick={handleSaveNote}
                  disabled={blockUnblockDeleteMutation.isPending}
                >
                  {blockUnblockDeleteMutation.isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Note"
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={showMessageModal} onOpenChange={setShowMessageModal}>
        <DialogContent className="max-w-lg p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pr-12">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <Mail className="w-5 h-5 text-primary" />
              Send private message
            </DialogTitle>
            <DialogDescription>
              Send a direct message to <span className="font-medium text-foreground">{getDisplayName()}</span>.
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 pb-2 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="message-title">Subject</Label>
              <Input
                id="message-title"
                placeholder="Enter a clear subject"
                value={messageTitle}
                onChange={(e) => setMessageTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Write your message here..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="min-h-32 resize-y"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMessageModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={sendMessage}
              disabled={!messageText.trim() || !messageTitle.trim() || sendPrivateMessageMutation.isPending}
              className="flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              {sendPrivateMessageMutation.isPending ? "Sending..." : "Send message"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showBlockModal} onOpenChange={setShowBlockModal}>
        <DialogContent className="max-w-md p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pr-12">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <span className={`flex h-10 w-10 items-center justify-center rounded-full ${isBlockedStatus ? "bg-emerald-100 text-emerald-700" : "bg-destructive/10 text-destructive"}`}>
                {isBlockedStatus ? <CheckCircle className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
              </span>
              {isBlockedStatus ? "Unblock" : "Block"} {entityLabel}
            </DialogTitle>
            <DialogDescription>
              {isBlockedStatus
                ? "This will restore the account's access."
                : "This will immediately prevent the account from accessing Twingle."}
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 pb-2">
            <div className="p-4 border rounded-lg bg-muted/40">
              <p className="text-sm text-muted-foreground">Account being changed</p>
              <p className="mt-1 font-semibold text-foreground">{getDisplayName()}</p>
              <p className="text-sm text-muted-foreground">{data.email}</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBlockModal(false)} disabled={blockUnblockDeleteMutation.isPending}>
              Cancel
            </Button>
            <Button
              variant={isBlockedStatus ? "default" : "destructive"}
              onClick={confirmBlock}
              className="flex items-center gap-2"
              disabled={blockUnblockDeleteMutation.isPending}
            >
              {isBlockedStatus ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
              {isBlockedStatus ? "Unblock account" : "Block account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="max-w-md p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pr-12">
            <DialogTitle className="flex items-center gap-2 text-xl">
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-destructive/10 text-destructive">
                <Trash2 className="w-5 h-5" />
              </span>
              Delete {entityLabel}
            </DialogTitle>
            <DialogDescription>
              Are you sure u want to delete/remove this {entityLabel.toLowerCase()}?
            </DialogDescription>
          </DialogHeader>
          <div className="px-6 pb-2">
            <div className="p-4 border border-destructive/20 rounded-lg bg-destructive/5">
              <p className="font-semibold text-foreground">{getDisplayName()}</p>
              <p className="mt-1 text-sm text-muted-foreground">This action cannot be undone.</p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteModal(false)} disabled={blockUnblockDeleteMutation.isPending}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={blockUnblockDeleteMutation.isPending} className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Delete {entityLabel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}