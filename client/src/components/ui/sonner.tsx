import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      position="bottom-center"
      toastOptions={{
        style: {
          background: "hsl(var(--popover))",
          color: "hsl(var(--popover-foreground))",
          border: "2px solid hsl(var(--border))",
          fontSize: "16px",
          fontWeight: "600",
          padding: "16px 24px",
          minWidth: "300px",
        },
        classNames: {
          success: "bg-green-600 dark:bg-green-600 text-white dark:text-white border-green-700 dark:border-green-500 shadow-lg",
          error: "bg-red-600 dark:bg-red-600 text-white dark:text-white border-red-700 dark:border-red-500 shadow-lg",
          info: "bg-blue-600 dark:bg-blue-600 text-white dark:text-white border-blue-700 dark:border-blue-500 shadow-lg",
          warning: "bg-yellow-600 dark:bg-yellow-600 text-white dark:text-white border-yellow-700 dark:border-yellow-500 shadow-lg",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
