import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FieldGroup } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import {
  Loader2,
  ClipboardCheck,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { useGetDivisionsQuery } from "@/redux/features/division/division.api";
import {
  useApplyForGuideMutation,
  useGetMyGuideApplicationQuery,
} from "@/redux/features/guide/guide.api";
import SingleImageUploader from "@/components/SingleImageUploader";

interface Division {
  _id: string;
  name: string;
}

interface GuideApplicationFormValues {
  division: string;
}

const STATUS_META: Record<
  string,
  { label: string; icon: typeof Clock; className: string }
> = {
  PENDING: {
    label: "Pending Review",
    icon: Clock,
    className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
  },
  APPROVED: {
    label: "Approved",
    icon: CheckCircle2,
    className: "bg-green-100 text-green-700 hover:bg-green-100",
  },
  REJECTED: {
    label: "Rejected",
    icon: XCircle,
    className: "bg-red-100 text-red-700 hover:bg-red-100",
  },
};

export default function ApplyForGuide() {
  const { data: divisions, isLoading: isDivisionsLoading } =
    useGetDivisionsQuery(undefined);

  const { data: myApplication, isLoading: isApplicationLoading } =
    useGetMyGuideApplicationQuery(undefined);

  console.log("myApplication", myApplication);

  const [applyForGuide, { isLoading: isSubmitting }] =
    useApplyForGuideMutation();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const form = useForm<GuideApplicationFormValues>({
    defaultValues: {
      division: "",
    },
  });

  const onSubmit: SubmitHandler<GuideApplicationFormValues> = async (data) => {
    if (!selectedFile) {
      toast.error("Please upload a photo of your NID");
      return;
    }

    try {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          division: data.division,
        }),
      );
      formData.append("file", selectedFile);

      const res = await applyForGuide(formData).unwrap();

      if (res.success) {
        toast.success("Application submitted successfully");
        form.reset();
        setSelectedFile(null);
      }
    } catch (err) {
      toast.error(
        getErrorMessage(err as FetchBaseQueryError | SerializedError),
      );
    }
  };

  if (isApplicationLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  // Already applied — show status instead of the form
  if (myApplication) {
    const meta = STATUS_META[myApplication.status] ?? STATUS_META.PENDING;
    const StatusIcon = meta.icon;

    return (
      <div className="mx-auto max-w-2xl md:px-4 md:py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Guide Application</h1>
          <p className="text-sm text-muted-foreground">
            Track the status of your application below.
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold">
                Application Status
              </CardTitle>
              <Badge className={`gap-1 ${meta.className}`}>
                <StatusIcon className="h-3 w-3" />
                {meta.label}
              </Badge>
            </div>
            <CardDescription>
              Division: {myApplication.division?.name ?? "—"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {myApplication.status === "PENDING" && (
              <Alert>
                <Clock className="h-4 w-4" />
                <AlertTitle>Under review</AlertTitle>
                <AlertDescription>
                  Our team is reviewing your NID and division details. This
                  usually takes 1–2 business days.
                </AlertDescription>
              </Alert>
            )}
            {myApplication.status === "REJECTED" && (
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Application rejected</AlertTitle>
                <AlertDescription>
                  Your application wasn't approved. Please contact support for
                  details or reapply with updated information.
                </AlertDescription>
              </Alert>
            )}
            {myApplication.status === "APPROVED" && (
              <Alert>
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>You're an approved guide</AlertTitle>
                <AlertDescription>
                  You can now offer your services on the platform.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="md:mx-auto md:min-w-xl md:px-4 md:py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Apply for Guide</h1>
        <p className="text-sm text-muted-foreground">
          Submit your division and NID to apply as a guide.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <ClipboardCheck className="h-4 w-4" />
            Application Details
          </CardTitle>
          <CardDescription>
            Your application will be reviewed by our team before approval.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FieldGroup>
                <div className="grid w-full grid-cols-1 gap-5">
                  {/* Division */}
                  <FormField
                    control={form.control}
                    name="division"
                    rules={{ required: "Please select a division" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Division</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={isDivisionsLoading}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                placeholder={
                                  isDivisionsLoading
                                    ? "Loading divisions..."
                                    : "Select your division"
                                }
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {divisions?.map((division: Division) => (
                              <SelectItem
                                key={division._id}
                                value={division._id}
                              >
                                {division.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* NID Photo */}
                  <FormItem>
                    <FormLabel>NID Photo</FormLabel>
                    <FormControl>
                      <SingleImageUploader
                        onChange={(file) => setSelectedFile(file)}
                      />
                    </FormControl>
                    {!selectedFile && (
                      <p className="text-xs text-muted-foreground">
                        * Upload a clear photo of your National ID card.
                      </p>
                    )}
                  </FormItem>
                </div>
              </FieldGroup>

              <div className="mt-8 flex justify-end">
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
