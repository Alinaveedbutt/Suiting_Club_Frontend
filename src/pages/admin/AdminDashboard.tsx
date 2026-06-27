import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
    Package,
    Clock,
    CheckCircle,
    Truck,
    XCircle,
    LogOut,
    Search,
    RefreshCw,
    LayoutDashboard,
} from "lucide-react";

interface Order {
    id: number;
    order_number: string;
    product_name: string;
    product_slug: string;
    product_price: number;
    email: string;
    phone: string;
    address: string;
    city: string;
    postal_code: string;
    status: string;
    created_at: string;
}

interface Stats {
    totalOrders: number;
    pending: number;
    confirmed: number;
    shipped: number;
    delivered: number;
    totalProducts: number;
}

const statusColors: Record<string, string> = {
    Pending: "border-yellow-500/30 text-yellow-400 bg-yellow-500/10",
    Confirmed: "border-blue-500/30 text-blue-400 bg-blue-500/10",
    Shipped: "border-purple-500/30 text-purple-400 bg-purple-500/10",
    Delivered: "border-green-500/30 text-green-400 bg-green-500/10",
    Cancelled: "border-red-500/30 text-red-400 bg-red-500/10",
};

const statusIcons: Record<string, React.ReactNode> = {
    Pending: <Clock className="w-3.5 h-3.5" />,
    Confirmed: <CheckCircle className="w-3.5 h-3.5" />,
    Shipped: <Truck className="w-3.5 h-3.5" />,
    Delivered: <Package className="w-3.5 h-3.5" />,
    Cancelled: <XCircle className="w-3.5 h-3.5" />,
};

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchOrders = useCallback(async () => {
        try {
            const params = new URLSearchParams({ page: String(page), limit: "15" });
            if (filter !== "all") params.set("status", filter);
            if (search) params.set("search", search);

            const res = await fetch(`/api/admin/orders?${params}`, {
                credentials: "include",
            });

            if (res.status === 401) {
                navigate("/admin");
                return;
            }

            const data = await res.json();
            setOrders(data.orders);
            setTotalPages(data.pagination.pages || 1);
        } catch (err) {
            console.error("Failed to fetch orders:", err);
        }
    }, [page, filter, search, navigate]);

    const fetchStats = useCallback(async () => {
        try {
            const res = await fetch("/api/admin/stats", { credentials: "include" });
            if (res.ok) {
                setStats(await res.json());
            }
        } catch (err) {
            console.error("Failed to fetch stats:", err);
        }
    }, []);

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            // Auth check
            try {
                const res = await fetch("/api/admin/check", { credentials: "include" });
                if (!res.ok) {
                    navigate("/admin");
                    return;
                }
            } catch {
                navigate("/admin");
                return;
            }

            await Promise.all([fetchOrders(), fetchStats()]);
            setLoading(false);
        };
        init();
    }, []);

    useEffect(() => {
        if (!loading) fetchOrders();
    }, [page, filter, fetchOrders, loading]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        fetchOrders();
    };

    const updateStatus = async (orderId: number, newStatus: string) => {
        try {
            const res = await fetch(`/api/admin/orders/${orderId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ status: newStatus }),
            });

            if (res.ok) {
                setOrders((prev) =>
                    prev.map((o) =>
                        o.id === orderId ? { ...o, status: newStatus } : o
                    )
                );
                fetchStats();
            }
        } catch (err) {
            console.error("Failed to update status:", err);
        }
    };

    const handleLogout = async () => {
        await fetch("/api/admin/logout", {
            method: "POST",
            credentials: "include",
        });
        navigate("/admin");
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-PK", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-background p-6">
                <div className="max-w-7xl mx-auto animate-pulse space-y-6">
                    <div className="h-8 bg-charcoal w-48" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="h-24 bg-charcoal" />
                        ))}
                    </div>
                    <div className="h-96 bg-charcoal" />
                </div>
            </main>
        );
    }

    return (
        <>
            <Helmet>
                <title>Admin Dashboard | Suiting Club</title>
            </Helmet>

            <main className="min-h-screen bg-background">
                {/* Top Bar */}
                <header className="border-b border-border bg-charcoal">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <LayoutDashboard className="w-5 h-5 text-gold" />
                            <div>
                                <h1 className="font-display text-xl text-foreground">
                                    Dashboard
                                </h1>
                                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                                    Suiting Club Admin
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                to="/"
                                className="text-xs uppercase tracking-widest text-muted-foreground hover:text-gold transition-colors hidden sm:block"
                            >
                                View Store
                            </Link>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleLogout}
                                className="text-muted-foreground hover:text-foreground"
                            >
                                <LogOut className="w-4 h-4 mr-1" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Stats Cards */}
                    {stats && (
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                            {[
                                {
                                    label: "Total Orders",
                                    value: stats.totalOrders,
                                    icon: <Package className="w-5 h-5" />,
                                    color: "text-gold",
                                },
                                {
                                    label: "Pending",
                                    value: stats.pending,
                                    icon: <Clock className="w-5 h-5" />,
                                    color: "text-yellow-400",
                                },
                                {
                                    label: "Confirmed",
                                    value: stats.confirmed,
                                    icon: <CheckCircle className="w-5 h-5" />,
                                    color: "text-blue-400",
                                },
                                {
                                    label: "Shipped",
                                    value: stats.shipped,
                                    icon: <Truck className="w-5 h-5" />,
                                    color: "text-purple-400",
                                },
                                {
                                    label: "Delivered",
                                    value: stats.delivered,
                                    icon: <Package className="w-5 h-5" />,
                                    color: "text-green-400",
                                },
                            ].map((stat) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-charcoal border border-border p-4"
                                >
                                    <div className={`${stat.color} mb-2`}>{stat.icon}</div>
                                    <p className="font-display text-2xl text-foreground">
                                        {stat.value}
                                    </p>
                                    <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    )}

                    {/* Filters Bar */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                        <form onSubmit={handleSearch} className="flex gap-2 flex-1">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search orders, emails, products..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="bg-charcoal border-border pl-10"
                                />
                            </div>
                            <Button variant="outline" type="submit" size="default">
                                <Search className="w-4 h-4" />
                            </Button>
                        </form>

                        <div className="flex gap-2">
                            <Select value={filter} onValueChange={(v) => { setFilter(v); setPage(1); }}>
                                <SelectTrigger className="w-[160px] bg-charcoal border-border">
                                    <SelectValue placeholder="Filter status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Orders</SelectItem>
                                    <SelectItem value="Pending">Pending</SelectItem>
                                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                                    <SelectItem value="Shipped">Shipped</SelectItem>
                                    <SelectItem value="Delivered">Delivered</SelectItem>
                                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                                </SelectContent>
                            </Select>

                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => {
                                    fetchOrders();
                                    fetchStats();
                                }}
                            >
                                <RefreshCw className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Orders Table */}
                    <div className="border border-border overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-charcoal border-b border-border">
                                        <th className="text-left p-4 text-xs uppercase tracking-widest text-muted-foreground font-medium">
                                            Order #
                                        </th>
                                        <th className="text-left p-4 text-xs uppercase tracking-widest text-muted-foreground font-medium">
                                            Product
                                        </th>
                                        <th className="text-left p-4 text-xs uppercase tracking-widest text-muted-foreground font-medium hidden md:table-cell">
                                            Customer
                                        </th>
                                        <th className="text-left p-4 text-xs uppercase tracking-widest text-muted-foreground font-medium hidden lg:table-cell">
                                            City
                                        </th>
                                        <th className="text-left p-4 text-xs uppercase tracking-widest text-muted-foreground font-medium">
                                            Status
                                        </th>
                                        <th className="text-left p-4 text-xs uppercase tracking-widest text-muted-foreground font-medium hidden sm:table-cell">
                                            Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={6}
                                                className="text-center p-12 text-muted-foreground"
                                            >
                                                No orders found.
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map((order) => (
                                            <tr
                                                key={order.id}
                                                className="border-b border-border hover:bg-charcoal/50 transition-colors"
                                            >
                                                <td className="p-4 font-mono text-gold text-xs">
                                                    {order.order_number}
                                                </td>
                                                <td className="p-4">
                                                    <p className="text-foreground font-medium truncate max-w-[200px]">
                                                        {order.product_name}
                                                    </p>
                                                    <p className="text-muted-foreground text-xs mt-0.5">
                                                        PKR {order.product_price?.toLocaleString("en-PK")}
                                                    </p>
                                                </td>
                                                <td className="p-4 hidden md:table-cell">
                                                    <p className="text-foreground text-xs">
                                                        {order.email}
                                                    </p>
                                                    <p className="text-muted-foreground text-xs">
                                                        {order.phone}
                                                    </p>
                                                </td>
                                                <td className="p-4 hidden lg:table-cell text-muted-foreground">
                                                    {order.city}
                                                </td>
                                                <td className="p-4">
                                                    <Select
                                                        value={order.status}
                                                        onValueChange={(v) => updateStatus(order.id, v)}
                                                    >
                                                        <SelectTrigger
                                                            className={`w-[130px] h-8 text-xs border ${statusColors[order.status] || ""
                                                                }`}
                                                        >
                                                            <span className="flex items-center gap-1.5">
                                                                {statusIcons[order.status]}
                                                                <SelectValue />
                                                            </span>
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Pending">Pending</SelectItem>
                                                            <SelectItem value="Confirmed">
                                                                Confirmed
                                                            </SelectItem>
                                                            <SelectItem value="Shipped">Shipped</SelectItem>
                                                            <SelectItem value="Delivered">
                                                                Delivered
                                                            </SelectItem>
                                                            <SelectItem value="Cancelled">
                                                                Cancelled
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </td>
                                                <td className="p-4 hidden sm:table-cell text-xs text-muted-foreground whitespace-nowrap">
                                                    {formatDate(order.created_at)}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-4 text-sm">
                            <p className="text-muted-foreground">
                                Page {page} of {totalPages}
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={page <= 1}
                                    onClick={() => setPage((p) => p - 1)}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={page >= totalPages}
                                    onClick={() => setPage((p) => p + 1)}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default AdminDashboard;
