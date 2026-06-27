import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Loader2 } from "lucide-react";

const orderSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    phone: z
        .string()
        .min(7, "Phone number is required")
        .regex(/^[\d\s\-+()]{7,20}$/, "Please enter a valid phone number"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    city: z.string().min(2, "City is required"),
    postal_code: z
        .string()
        .regex(/^\d{4,6}$/, "Postal code must be 4-6 digits"),
});

type OrderFormData = z.infer<typeof orderSchema>;

interface OrderModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    productSlug: string;
    productName: string;
}

const OrderModal = ({
    open,
    onOpenChange,
    productSlug,
    productName,
}: OrderModalProps) => {
    const [status, setStatus] = useState<
        "idle" | "submitting" | "success" | "error"
    >("idle");
    const [orderNumber, setOrderNumber] = useState("");
    const [serverError, setServerError] = useState("");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<OrderFormData>({
        resolver: zodResolver(orderSchema),
    });

    const onSubmit = async (data: OrderFormData) => {
        setStatus("submitting");
        setServerError("");

        try {
            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...data, product_slug: productSlug }),
            });

            const result = await res.json();

            if (!res.ok) {
                setStatus("error");
                setServerError(
                    result.errors?.join(", ") || "Something went wrong. Please try again."
                );
                return;
            }

            setOrderNumber(result.order_number);
            setStatus("success");
            reset();
        } catch {
            setStatus("error");
            setServerError("Network error. Please check your connection and try again.");
        }
    };

    const handleClose = () => {
        onOpenChange(false);
        // Reset after animation completes
        setTimeout(() => {
            setStatus("idle");
            setServerError("");
            setOrderNumber("");
            reset();
        }, 300);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[480px] bg-background border-border p-0 overflow-hidden">
                <AnimatePresence mode="wait">
                    {status === "success" ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="p-8 text-center"
                        >
                            <div className="mb-6">
                                <CheckCircle className="w-16 h-16 text-gold mx-auto mb-4" />
                                <h3 className="font-display text-2xl text-foreground mb-2">
                                    Order Placed Successfully
                                </h3>
                                <div className="w-16 h-px bg-gold mx-auto my-4" />
                            </div>
                            <p className="text-muted-foreground mb-2">
                                Your order has been placed and will be shipped soon.
                            </p>
                            <p className="text-sm text-muted-foreground mb-6">
                                Order Number:{" "}
                                <span className="text-gold font-medium">{orderNumber}</span>
                            </p>
                            <Button variant="gold" onClick={handleClose} className="w-full">
                                Continue Shopping
                            </Button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <DialogHeader className="p-6 pb-0">
                                <DialogTitle className="font-display text-2xl text-foreground">
                                    Order Now
                                </DialogTitle>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {productName}
                                </p>
                                <div className="w-12 h-px bg-gold mt-4" />
                            </DialogHeader>

                            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                                {serverError && (
                                    <div className="p-3 bg-destructive/10 border border-destructive/30 text-destructive text-sm rounded-sm">
                                        {serverError}
                                    </div>
                                )}

                                <div className="space-y-1.5">
                                    <Label htmlFor="order-email" className="text-xs uppercase tracking-widest text-muted-foreground">
                                        Email Address
                                    </Label>
                                    <Input
                                        id="order-email"
                                        placeholder="your@email.com"
                                        {...register("email")}
                                        className="bg-charcoal border-border focus:border-gold"
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-destructive">{errors.email.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="order-phone" className="text-xs uppercase tracking-widest text-muted-foreground">
                                        Phone Number
                                    </Label>
                                    <Input
                                        id="order-phone"
                                        placeholder="0300 1234567"
                                        {...register("phone")}
                                        className="bg-charcoal border-border focus:border-gold"
                                    />
                                    {errors.phone && (
                                        <p className="text-xs text-destructive">{errors.phone.message}</p>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <Label htmlFor="order-address" className="text-xs uppercase tracking-widest text-muted-foreground">
                                        Delivery Address
                                    </Label>
                                    <Input
                                        id="order-address"
                                        placeholder="House #, Street, Area"
                                        {...register("address")}
                                        className="bg-charcoal border-border focus:border-gold"
                                    />
                                    {errors.address && (
                                        <p className="text-xs text-destructive">
                                            {errors.address.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label htmlFor="order-city" className="text-xs uppercase tracking-widest text-muted-foreground">
                                            City
                                        </Label>
                                        <Input
                                            id="order-city"
                                            placeholder="Lahore"
                                            {...register("city")}
                                            className="bg-charcoal border-border focus:border-gold"
                                        />
                                        {errors.city && (
                                            <p className="text-xs text-destructive">
                                                {errors.city.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-1.5">
                                        <Label htmlFor="order-postal" className="text-xs uppercase tracking-widest text-muted-foreground">
                                            Postal Code
                                        </Label>
                                        <Input
                                            id="order-postal"
                                            placeholder="54000"
                                            {...register("postal_code")}
                                            className="bg-charcoal border-border focus:border-gold"
                                        />
                                        {errors.postal_code && (
                                            <p className="text-xs text-destructive">
                                                {errors.postal_code.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    variant="gold"
                                    size="lg"
                                    className="w-full mt-2"
                                    disabled={status === "submitting"}
                                >
                                    {status === "submitting" ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Placing Order...
                                        </>
                                    ) : (
                                        "Place Order"
                                    )}
                                </Button>

                                <p className="text-[11px] text-center text-muted-foreground">
                                    By placing an order, you agree to be contacted regarding your
                                    purchase. No online payment required.
                                </p>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
};

export default OrderModal;
