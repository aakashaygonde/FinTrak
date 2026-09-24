import {
  LuLayoutDashboard,
  LuArrowLeftRight,
  LuPiggyBank,
  LuChartLine,
  LuSettings,
  LuWalletMinimal,
  LuHandCoins,
  LuLogOut,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "transactions",
    label: "Transactions",
    icon: LuArrowLeftRight,
    path: "/transactions",
    subItems: [
      { label: "Expenses", path: "/expense", icon: LuHandCoins },
      { label: "Income", path: "/income", icon: LuWalletMinimal },
    ],
  },
  {
    id: "budgets",
    label: "Budgets",
    icon: LuPiggyBank,
    path: "/budgets",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: LuChartLine,
    path: "/analytics",
  },
  {
    id: "settings",
    label: "Profile & Settings",
    icon: LuSettings,
    path: "/settings",
  },
];

export const SECONDARY_MENU_DATA = [
  {
    id: "income",
    label: "Income",
    icon: LuWalletMinimal,
    path: "/income",
  },
  {
    id: "expense",
    label: "Expense",
    icon: LuHandCoins,
    path: "/expense",
  },
];